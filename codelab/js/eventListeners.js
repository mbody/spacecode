function showCode() {
  // Generate JavaScript code and display it.
  javascript.javascriptGenerator.INFINITE_LOOP_TRAP = null
  var code = javascript.javascriptGenerator.workspaceToCode(demoWorkspace)
  alert(code)
  saveCode()
}

function runCode() {
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
}

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

async function testSpacecodeClient() {
  Spacecode.connect('Mathurin', '#f00dbb')
  for (let index = 0; index < 100; index++) {
    Spacecode.moveForward()
    Spacecode.turnRight()
    await Spacecode.update()
  }
  Spacecode.disconnect()
}
