const DEMO_PATROL = {
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
            type: 'variables_set',
            id: '!%L5lB}grmK|0sVLFevT',
            fields: {
              VAR: {
                id: '.pYxe}z1qG2R8W^:Bj5J'
              }
            },
            inputs: {
              VALUE: {
                block: {
                  type: 'math_number',
                  id: 'Yic-s9r3esJGU[K8{.0%',
                  fields: {
                    NUM: 0
                  }
                }
              }
            },
            next: {
              block: {
                type: 'spacecode_setAttribute',
                id: '#]m#.mITAL:8D#sc;AS%',
                fields: {
                  ATTRIBUTE: 'x',
                  NAME: 'à'
                },
                inputs: {
                  NAME: {
                    block: {
                      type: 'math_number',
                      id: '{brnkPRzjc/c%!oC^FEl',
                      fields: {
                        NUM: 20
                      }
                    }
                  }
                },
                next: {
                  block: {
                    type: 'spacecode_setAttribute',
                    id: '4$B:-Gznsl+vsOS)sAas',
                    fields: {
                      ATTRIBUTE: 'y',
                      NAME: 'à'
                    },
                    inputs: {
                      NAME: {
                        block: {
                          type: 'math_number',
                          id: '.Hn0s~T(k;+YYU7))]Yi',
                          fields: {
                            NUM: 20
                          }
                        }
                      }
                    },
                    next: {
                      block: {
                        type: 'spacecode_setAttribute',
                        id: '4gXm;n;aCe_8N[C!MaH[',
                        fields: {
                          ATTRIBUTE: 'rotation',
                          NAME: 'à'
                        },
                        inputs: {
                          NAME: {
                            block: {
                              type: 'math_number',
                              id: 'ANj./6axnjAQ?5aDV{3?',
                              fields: {
                                NUM: 90
                              }
                            }
                          }
                        },
                        next: {
                          block: {
                            type: 'variables_set',
                            id: 'LB1bPv([k7xaXyTI0}m.',
                            fields: {
                              VAR: {
                                id: '-87:~^F!(k[5AH}u,,.+'
                              }
                            },
                            inputs: {
                              VALUE: {
                                block: {
                                  type: 'math_number',
                                  id: 'o[dY1lW/G%(yW:=4wYW,',
                                  fields: {
                                    NUM: 0
                                  }
                                }
                              }
                            },
                            next: {
                              block: {
                                type: 'spacecode_loop',
                                id: 'MVeY]iA$#$yj.RTrxwH-',
                                inputs: {
                                  CONTENT: {
                                    block: {
                                      type: 'math_change',
                                      id: 'gODYH@J|u^WC!/%7_h{r',
                                      fields: {
                                        VAR: {
                                          id: '-87:~^F!(k[5AH}u,,.+'
                                        }
                                      },
                                      inputs: {
                                        DELTA: {
                                          shadow: {
                                            type: 'math_number',
                                            id: '8:6=%^sisL2XYjG{KR2P',
                                            fields: {
                                              NUM: 1
                                            }
                                          }
                                        }
                                      },
                                      next: {
                                        block: {
                                          type: 'controls_if',
                                          id: 'Jd_QS~ImdmLtRJOJp/7T',
                                          inputs: {
                                            IF0: {
                                              block: {
                                                type: 'logic_compare',
                                                id: 'jc/+5wC%p%GV5i%9;sS$',
                                                fields: {
                                                  OP: 'GTE'
                                                },
                                                inputs: {
                                                  A: {
                                                    block: {
                                                      type: 'variables_get',
                                                      id: '/V[6hZ9yRb.q5l;:F*fI',
                                                      fields: {
                                                        VAR: {
                                                          id: '-87:~^F!(k[5AH}u,,.+'
                                                        }
                                                      }
                                                    }
                                                  },
                                                  B: {
                                                    block: {
                                                      type: 'math_number',
                                                      id: 'koFVIWp[t`TpZJ._y0)@',
                                                      fields: {
                                                        NUM: 50
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            },
                                            DO0: {
                                              block: {
                                                type: 'variables_set',
                                                id: 'kx+q!zDK~VV9`,Pe,5W_',
                                                fields: {
                                                  VAR: {
                                                    id: '-87:~^F!(k[5AH}u,,.+'
                                                  }
                                                },
                                                inputs: {
                                                  VALUE: {
                                                    block: {
                                                      type: 'math_number',
                                                      id: 'E+{DasOyd#1ED_m;ReWq',
                                                      fields: {
                                                        NUM: 0
                                                      }
                                                    }
                                                  }
                                                },
                                                next: {
                                                  block: {
                                                    type: 'math_change',
                                                    id: 'fI;a`E;JoJzFe;LK2dlS',
                                                    fields: {
                                                      VAR: {
                                                        id: '.pYxe}z1qG2R8W^:Bj5J'
                                                      }
                                                    },
                                                    inputs: {
                                                      DELTA: {
                                                        shadow: {
                                                          type: 'math_number',
                                                          id: '4rYr6j?X|%rCSL6MEA%6',
                                                          fields: {
                                                            NUM: 90
                                                          }
                                                        }
                                                      }
                                                    },
                                                    next: {
                                                      block: {
                                                        type: 'spacecode_setAttribute',
                                                        id: 'JAPTt!?qm;S`$[=D%JwZ',
                                                        fields: {
                                                          ATTRIBUTE: 'rotation',
                                                          NAME: 'à'
                                                        },
                                                        inputs: {
                                                          NAME: {
                                                            block: {
                                                              type: 'variables_get',
                                                              id: 'kfu;PBw(^456l%d.XTz#',
                                                              fields: {
                                                                VAR: {
                                                                  id: '.pYxe}z1qG2R8W^:Bj5J'
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          next: {
                                            block: {
                                              type: 'spacecode_move',
                                              id: '4VRg%0/Yb]3w`E~r;N@c',
                                              fields: {
                                                DIRECTION: 'forward'
                                              },
                                              next: {
                                                block: {
                                                  type: 'spacecode_shoot',
                                                  id: 'ul6TEt.V]vAAVMWDwCUg'
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    ]
  }
}
