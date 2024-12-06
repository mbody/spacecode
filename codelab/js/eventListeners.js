function showCode() {
  // Generate JavaScript code and display it.
  javascript.javascriptGenerator.INFINITE_LOOP_TRAP = null
  var code = javascript.javascriptGenerator.workspaceToCode(demoWorkspace)
  alert(code)
  console.log(code)

  saveCode()
}

const runButton = document.querySelector('#run-btn')
let isRunning = false
runButton.addEventListener('click', () => {
  if (isRunning) {
    eval('Spacecode.disconnect()')
  } else {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000
    javascript.javascriptGenerator.INFINITE_LOOP_TRAP =
      'if (--window.LoopTrap < 0) throw "Infinite loop.";\n'
    var code = javascript.javascriptGenerator.workspaceToCode(demoWorkspace)
    javascript.javascriptGenerator.INFINITE_LOOP_TRAP = null
    try {
      eval(code)
      saveCode()
    } catch (e) {
      alert(e)
    }
    runButton.blur()
  }
  isRunning = !isRunning
  document.querySelector('#run-btn-icon ').innerHTML = isRunning
    ? 'pause'
    : 'play_arrow'
})

function saveCode() {
  // Serialize the state.
  const state = JSON.stringify(
    Blockly.serialization.workspaces.save(demoWorkspace)
  )

  // Then you save the state, e.g. to local storage.
  localStorage.setItem('workspace-state', state)
  console.log('Le code a été enregistré !')
}

function restoreCode() {
  // Get your saved state from somewhere, e.g. local storage.
  const state = localStorage.getItem('workspace-state')
  if (state == null) {
    return false
  }

  // Deserialize the state.
  Blockly.serialization.workspaces.load(JSON.parse(state), demoWorkspace)
  return true
}

function exportAsFile() {
  var tempLink = document.createElement('a')
  const state = JSON.stringify(
    Blockly.serialization.workspaces.save(demoWorkspace)
  )
  var taBlob = new Blob([state], { type: 'application/json' })
  tempLink.setAttribute('href', URL.createObjectURL(taBlob))
  tempLink.setAttribute('download', `spacecode.json`)
  tempLink.click()

  URL.revokeObjectURL(tempLink.href)
}

function importFile() {
  const uploadInput = document.getElementById('uploadInput')
  uploadInput.addEventListener('change', function (event) {
    let file = event.target.files[0]
    let reader = new FileReader()

    reader.onload = function (event) {
      var blocks = JSON.parse(event.target.result)
      Blockly.serialization.workspaces.load(blocks, demoWorkspace)
    }

    reader.readAsText(file)
  })
  uploadInput.click()
}

async function testSpacecodeClient() {
  Spacecode.connect('Mathurin', '#f00dbb')
  for (let index = 0; index < 100; index++) {
    Spacecode.moveForward()
    Spacecode.turnRight()
    await Spacecode.update()
  }
  Spacecode.disconnect()
}
