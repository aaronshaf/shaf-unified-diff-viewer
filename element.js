import createElementClass from 'create-element-class'
import leven from 'leven'
import diff from 'fast-diff'

const lineTypes = { ' ': 'context', '+': 'addition', '-': 'removal' }

const spanTypes = { ' ': 'span', '+': 'ins', '-': 'del' }

export default createElementClass({
  attributeChangedCallback (name, oldValue, newValue) {
    if (this.rendered) {
      this.updateRendering()
    }
  },
  connectedCallback () {
    const pre = this.querySelector('pre')
    pre.style.display = 'none'
    const patch = pre.textContent

    this.container = document.createElement('div')
    if (document.body.attachShadow) {
      this.container = this.container.attachShadow({ mode: 'open' })
    }

    let oops = 0

    const lines = removeIndentation(patch)
    removeBeginningNonChunkLines(lines)
    const chunks = toChunks(lines)

    for (let chunk of chunks) {
      const removalLines = chunk.lines.filter(line => line.type === 'removal')
      const additionLines = chunk.lines.filter(
        line => line.type === 'addition'
      )
      // console.debug(chunk.lines)
      removalLines.forEach((removalLine, index) => {
        additionLines.forEach((additionLine, index) => {
          if (additionLine.removalIdentified) {
            return
          }
          // if line is proximate replacement, show char-level diff
          const l = leven(removalLine.text, additionLine.text)
          if (l < 10) {
            removalLine.isHidden = true
            // char-level diff
            additionLine.diff = diff(removalLine.text, additionLine.text)
            additionLine.removalIdentified = true
          }
        })
      })
    }

    for (let chunk of chunks) {
      const chunkDiv = document.createElement('div')
      chunkDiv.className = 'chunk'
      for (let line of chunk.lines) {
        if (line.isHidden) {
          continue
        }
        const blockDiv = document.createElement('div')
        blockDiv.className = 'line'

        let inlineElements = []
        if (line.diff) {
          line.diff.forEach(diffSection => {
            let element
            if (diffSection[0] === diff.INSERT) {
              element = document.createElement('ins')
              element.style.backgroundColor = '#EAFFEA'
            } else if (diffSection[0] === diff.DELETE) {
              element = document.createElement('del')
              element.style.backgroundColor = '#FFECEC'
            } else {
              element = document.createElement('span')
            }
            element.textContent = diffSection[1]
            inlineElements.push(element)
          })
        } else if (line.type === 'addition') {
          inlineElements.push(document.createElement('ins'))
          inlineElements[0].style.backgroundColor = '#EAFFEA'
          inlineElements[0].style.textDecoration = 'inherit'
          inlineElements[0].textContent = line.text
        } else if (line.type === 'removal') {
          inlineElements.push(document.createElement('del'))
          inlineElements[0].style.backgroundColor = '#FFECEC'
          inlineElements[0].textContent = line.text
        } else {
          inlineElements.push(document.createElement('span'))
          inlineElements[0].textContent = line.text
        }
        inlineElements.forEach(inlineElement => {
          blockDiv.appendChild(inlineElement)
        })
        chunkDiv.appendChild(blockDiv)
        chunkDiv.style.fontFamily = `Consolas, "Liberation Mono", Menlo, Courier, monospace;`
        chunkDiv.style.whiteSpace = 'pre-wrap'
      }

      this.container.appendChild(chunkDiv)
      if (chunks[chunks.length - 1] !== chunk) {
        const hr = document.createElement('hr')
        this.container.appendChild(hr)
      }
    }

    this.appendChild(this.container)
  },
  updateRendering () {
    this.rendered = true
  }
})

function isNotRemoval (line) {
  return line.type !== 'removal'
}

function isChunkHeader (str) {
  return str && str.indexOf('@@') === 0
}

function findFirstChunkIndentation (string) {
  return string.split('\n').reduce(
    (prev, line) => {
      if (prev !== null) {
        return prev
      }
      if (line.substr(0, 2) === '@@') {
        return 0
      }
      const atChar = line.search(/(\s)@@/)
      if (atChar !== -1) {
        return line.indexOf('@@')
      }
      return null
    },
    null
  )
}

// normalize the chunk if it was indented in the <pre> element
function removeIndentation (patch) {
  const lines = patch.split('\n')
  const indentation = findFirstChunkIndentation(patch)
  return lines.map(line => {
    return line.substr(indentation)
  })
}

// remove all lines up until first chunk
// TODO: don't mutate
function removeBeginningNonChunkLines (lines) {
  while (lines.length && !isChunkHeader(lines[0])) {
    lines.shift()
  }
}

function toChunks (lines) {
  const chunks = []
  for (let line of lines) {
    if (isChunkHeader(line)) {
      chunks.push({ lines: [] })
    } else if (lineTypes[line[0]]) {
      chunks[chunks.length -
        1].lines.push({ type: lineTypes[line[0]], text: line.substr(1) })
    }
  }
  return chunks
}
