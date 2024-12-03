registerFieldColour()

Blockly.defineBlocksWithJsonArray([
  {
    type: 'color_wheel_picker',
    message0: 'Color: %1',
    args0: [
      {
        type: 'field_template',
        name: 'COLOR',
        color: '#FF00FF',
        width: 150,
        options: {
          layoutDirection: 'horizontal'
        }
      }
    ]
  }
])

BLOCK_COLOR = 285
INPUT_COLOR = 125

Blockly.common.defineBlocksWithJsonArray([
  {
    type: 'spacecode_connect',
    tooltip: 'Connection au jeu',
    helpUrl: '',
    message0: 'Se connecter en tant que %1 avec la couleur %2 %3',
    args0: [
      {
        type: 'field_input',
        name: 'USERNAME',
        text: 'username'
      },
      {
        type: 'field_colour',
        name: 'COLOR',
        colour: '#ffcc66'
      },
      {
        type: 'input_dummy',
        name: ''
      }
    ],
    nextStatement: null,
    colour: BLOCK_COLOR
  },
  {
    type: 'spacecode_turn',
    tooltip: 'Faire tourner le vaisseau',
    helpUrl: '',
    message0: 'Tourner vers la %1 %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'DIRECTION',
        options: [
          ['gauche', 'left'],
          ['droite', 'right']
        ]
      },
      {
        type: 'input_dummy',
        name: 'NAME'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: BLOCK_COLOR
  },
  {
    type: 'spacecode_move',
    tooltip: '',
    helpUrl: '',
    message0: "Avancer vers l' %1 %2",
    args0: [
      {
        type: 'field_dropdown',
        name: 'DIRECTION',
        options: [
          ['avant', 'forward'],
          ['arrière', 'backward']
        ]
      },
      {
        type: 'input_dummy',
        name: 'NAME'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: BLOCK_COLOR
  },
  {
    type: 'spacecode_loop',
    tooltip: '',
    helpUrl: '',
    message0: 'Toujours %1',
    args0: [
      {
        type: 'input_statement',
        name: 'CONTENT'
      }
    ],
    previousStatement: 'spacecode_connect',
    colour: BLOCK_COLOR
  },
  {
    type: 'spacecode_shoot',
    tooltip: '',
    helpUrl: '',
    message0: 'Shooter %1',
    args0: [
      {
        type: 'input_dummy',
        name: 'NAME'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: BLOCK_COLOR
  },
  {
    type: 'spacecode_isKeyPressed',
    tooltip:
      'Retourne true si la touche correspondant au code est enfoncée, false sinon',
    helpUrl:
      'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode',
    message0: 'Touche %1 enfoncée %2',
    args0: [
      {
        type: 'field_input',
        name: 'CODE',
        text: 'code'
      },
      {
        type: 'input_dummy',
        name: 'NAME'
      }
    ],
    output: 'Boolean',
    colour: INPUT_COLOR
  },
  {
    type: 'spacecode_isGamepadButtonPressed',
    tooltip: 'Retourne true si le bouton B0 à B5 est enfoncé, false sinon',
    helpUrl:
      'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode',
    message0: 'Bouton gamepad %1 enfoncé %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'CODE',
        options: [
          ['B0', GAMEPAD_BUTTON.B0],
          ['B1', GAMEPAD_BUTTON.B1],
          ['B2', GAMEPAD_BUTTON.B2],
          ['B3', GAMEPAD_BUTTON.B3],
          ['B4', GAMEPAD_BUTTON.B4],
          ['B5', GAMEPAD_BUTTON.B5]
        ]
      },
      {
        type: 'input_dummy',
        name: 'NAME'
      }
    ],
    output: 'Boolean',
    colour: INPUT_COLOR
  },
  {
    type: 'spacecode_isGamepadJoystickPointing',
    tooltip:
      'Retourne true si la touche correspondant au code est enfoncée, false sinon',
    helpUrl:
      'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode',
    message0: 'Joystick vers %1 %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'CODE',
        options: [
          ['Haut', JOYSTICK_DIRECTION.UP],
          ['Bas', JOYSTICK_DIRECTION.DOWN],
          ['Gauche', JOYSTICK_DIRECTION.LEFT],
          ['Droite', JOYSTICK_DIRECTION.RIGHT]
        ]
      },
      {
        type: 'input_dummy',
        name: 'NAME'
      }
    ],
    output: 'Boolean',
    colour: INPUT_COLOR
  },
  {
    type: 'spacecode_getAttribute',
    tooltip: "Valeur d'un attribut du vaisseau ",
    helpUrl: '',
    message0: '%1 %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'ATTRIBUTE',
        options: [
          ['x', 'x'],
          ['y', 'y'],
          ['rotation', 'rotation']
        ]
      },
      {
        type: 'input_dummy',
        name: 'NAME'
      }
    ],
    output: 'Number',
    colour: BLOCK_COLOR
  },
  {
    type: 'spacecode_setAttribute',
    tooltip: "Définir l'attribut du vasseau",
    helpUrl: '',
    message0: 'Définir %1 %2 %3',
    args0: [
      {
        type: 'field_dropdown',
        name: 'ATTRIBUTE',
        options: [
          ['x', 'x'],
          ['y', 'y'],
          ['rotation', 'rotation']
        ]
      },
      {
        type: 'field_label_serializable',
        text: 'à',
        name: 'NAME'
      },
      {
        type: 'input_value',
        name: 'NAME',
        check: 'Number'
      }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: BLOCK_COLOR,
    inputsInline: true
  }
])

javascript.javascriptGenerator.forBlock['spacecode_connect'] = (block) => {
  const text_username = block.getFieldValue('USERNAME')
  const colour_color = block.getFieldValue('COLOR')

  const code = `Spacecode.connect('${text_username}', '${colour_color}')\n`
  return code
}

javascript.javascriptGenerator.forBlock['spacecode_turn'] = (block) => {
  const dropdown_direction = block.getFieldValue('DIRECTION')
  const method = dropdown_direction === 'left' ? 'turnLeft' : 'turnRight'
  const code = `Spacecode.${method}()\n`
  return code
}

javascript.javascriptGenerator.forBlock['spacecode_move'] = (block) => {
  const dropdown_direction = block.getFieldValue('DIRECTION')
  const method =
    dropdown_direction === 'forward' ? 'moveForward' : 'moveBackward'
  const code = `Spacecode.${method}()\n`
  return code
}

javascript.javascriptGenerator.forBlock['spacecode_loop'] = function (block) {
  const statement_content = javascript.javascriptGenerator.statementToCode(
    block,
    'CONTENT'
  )

  const code = `
  loop = async () => {
    let e
    while(e === undefined){
        try{
          ${statement_content}
          await Spacecode.update()
        } catch(error){
          e = error
          console.error("ignoring error : ")
          console.error(e)
        }
    }
  }
  loop()
  `
  return code
}

javascript.javascriptGenerator.forBlock['spacecode_shoot'] = function (block) {
  const code = `Spacecode.shoot()\n`
  return code
}

javascript.javascriptGenerator.forBlock['spacecode_isKeyPressed'] = function (
  block
) {
  const keycode = block.getFieldValue('CODE')
  const code = `Spacecode.isKeyPressed('${keycode}')`

  return [code, javascript.Order.NONE]
}
javascript.javascriptGenerator.forBlock['spacecode_isGamepadButtonPressed'] =
  function (block) {
    const keycode = block.getFieldValue('CODE')
    const code = `Spacecode.isGamepadButtonPressed('${keycode}')`

    return [code, javascript.Order.NONE]
  }
javascript.javascriptGenerator.forBlock['spacecode_isGamepadJoystickPointing'] =
  function (block) {
    const keycode = block.getFieldValue('CODE')
    const code = `Spacecode.isGamepadJoystick('${keycode}')`

    return [code, javascript.Order.NONE]
  }

javascript.javascriptGenerator.forBlock['spacecode_getAttribute'] = function (
  block
) {
  const dropdown_attribute = block.getFieldValue('ATTRIBUTE')

  const code = `Spacecode['${dropdown_attribute}']`
  return [code, javascript.Order.NONE]
}

javascript.javascriptGenerator.forBlock['spacecode_setAttribute'] = function (
  block
) {
  const attribute = block.getFieldValue('ATTRIBUTE')
  const value = javascript.javascriptGenerator.valueToCode(
    block,
    'NAME',
    javascript.Order.ATOMIC
  )

  const code = `Spacecode.updatePlayerProperty('${attribute}',${value})`
  return code
}
