const DEMO_HUNTER = {
  blocks: {
    languageVersion: 0,
    blocks: [
      {
        type: 'spacecode_connect',
        id: 'q#FmbzA*jHn/!5.iHMXZ',
        x: 70,
        y: 73,
        fields: {
          USERNAME: 'VOTRE NOM',
          COLOR: '#ff9900'
        },
        next: {
          block: {
            type: 'spacecode_loop',
            id: 'MVeY]iA$#$yj.RTrxwH-',
            inputs: {
              CONTENT: {
                block: {
                  type: 'spacecode_orientTo',
                  id: '*[E#reNP9EJi!n?G-Ogx',
                  inputs: {
                    SPRITE: {
                      block: {
                        type: 'spacecode_getNearestEnemy',
                        id: ']:?2xMP+sgKJggd5iHx@'
                      }
                    }
                  },
                  next: {
                    block: {
                      type: 'spacecode_shoot',
                      id: '0v0RPv{!:uk@o.*I7}Cb'
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]
  },
  variables: [
    {
      name: 'i',
      id: '.pYxe}z1qG2R8W^:Bj5J'
    },
    {
      name: 'j',
      id: '-87:~^F!(k[5AH}u,,.+'
    }
  ]
}
