var startBlocks = {
  blocks: {
    languageVersion: 0,
    blocks: [
      {
        type: 'spacecode_connect',
        id: 'q#FmbzA*jHn/!5.iHMXZ',
        x: 120,
        y: 34,
        fields: { USERNAME: 'VOTRE NOM', COLOR: '#ff9900' },
        next: {
          block: {
            type: 'spacecode_loop',
            id: 'MVeY]iA$#$yj.RTrxwH-',
            inputs: {
              CONTENT: {
                block: {
                  type: 'controls_if',
                  id: 'ANdk[de[g$#nan`SARrd',
                  inputs: {
                    IF0: {
                      block: {
                        type: 'spacecode_isKeyPressed',
                        id: '6t[gC$d#`$wg~h!K2@`w',
                        fields: { CODE: 'ArrowUp' }
                      }
                    },
                    DO0: {
                      block: {
                        type: 'spacecode_setAttribute',
                        id: '[}D]*2N5?Yyv=^SO;-G3',
                        fields: { ATTRIBUTE: 'rotation', NAME: 'à' },
                        inputs: {
                          NAME: {
                            block: {
                              type: 'math_number',
                              id: '~$!P7:/rQqo|:.AZdNgS',
                              fields: { NUM: 0 }
                            }
                          }
                        }
                      }
                    }
                  },
                  next: {
                    block: {
                      type: 'controls_if',
                      id: 'uty.~Xv2O{(:xfKQmxmh',
                      inputs: {
                        IF0: {
                          block: {
                            type: 'spacecode_isKeyPressed',
                            id: ':Fv[IaQAAI4Y5TzP|5Kf',
                            fields: { CODE: 'ArrowDown' }
                          }
                        },
                        DO0: {
                          block: {
                            type: 'spacecode_setAttribute',
                            id: '~I=H^%nVwUqyVvRnfDt.',
                            fields: { ATTRIBUTE: 'rotation', NAME: 'à' },
                            inputs: {
                              NAME: {
                                block: {
                                  type: 'math_number',
                                  id: 'FGfz=2?^RYL)xBG]D~3a',
                                  fields: { NUM: 180 }
                                }
                              }
                            }
                          }
                        }
                      },
                      next: {
                        block: {
                          type: 'controls_if',
                          id: '/NLa3U@ob{=Pdq{c%/@|',
                          inputs: {
                            IF0: {
                              block: {
                                type: 'spacecode_isKeyPressed',
                                id: 'zV;@ark4fhy.`Z3wZs`z',
                                fields: { CODE: 'ArrowLeft' }
                              }
                            },
                            DO0: {
                              block: {
                                type: 'spacecode_setAttribute',
                                id: 'l6$gl{qjCXE]?CfN1~UF',
                                fields: { ATTRIBUTE: 'rotation', NAME: 'à' },
                                inputs: {
                                  NAME: {
                                    block: {
                                      type: 'math_number',
                                      id: 'N{twUMp?m/.uob,Qkr7T',
                                      fields: { NUM: -90 }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          next: {
                            block: {
                              type: 'controls_if',
                              id: '/rj(%^}s6o(:%hfJx7cD',
                              inputs: {
                                IF0: {
                                  block: {
                                    type: 'spacecode_isKeyPressed',
                                    id: '7NGQlM1aDQfm.0C$yXa2',
                                    fields: { CODE: 'ArrowRight' }
                                  }
                                },
                                DO0: {
                                  block: {
                                    type: 'spacecode_setAttribute',
                                    id: 'wZ`yM2F}sl9FKL-Sw2N~',
                                    fields: {
                                      ATTRIBUTE: 'rotation',
                                      NAME: 'à'
                                    },
                                    inputs: {
                                      NAME: {
                                        block: {
                                          type: 'math_number',
                                          id: 'E)@qL[zJ8u;L!hP{h.X;',
                                          fields: { NUM: 90 }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              next: {
                                block: {
                                  type: 'controls_if',
                                  id: 'Ppeh;#|V{oGHi}9MsG,B',
                                  inputs: {
                                    IF0: {
                                      block: {
                                        type: 'spacecode_isKeyPressed',
                                        id: '+bGyqIyB!.GK^hsn@Y|$',
                                        fields: { CODE: 'd' }
                                      }
                                    },
                                    DO0: {
                                      block: {
                                        type: 'spacecode_setAttribute',
                                        id: 'hZ@Wvn,,?IeB{QBz@C]B',
                                        fields: { ATTRIBUTE: 'x', NAME: 'à' },
                                        inputs: {
                                          NAME: {
                                            block: {
                                              type: 'math_arithmetic',
                                              id: 'z2,!^Ac7_y+lX;34V5GW',
                                              fields: { OP: 'ADD' },
                                              inputs: {
                                                A: {
                                                  block: {
                                                    type: 'spacecode_getAttribute',
                                                    id: 'X5*7$*r)Wg:yY3hwVn0(',
                                                    fields: { ATTRIBUTE: 'x' }
                                                  }
                                                },
                                                B: {
                                                  block: {
                                                    type: 'math_number',
                                                    id: 'V4}AtSHsQQO;ny2:G(^X',
                                                    fields: { NUM: 30 }
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
                                      type: 'controls_if',
                                      id: '0*mtalHV?M~eaM1Zm;T8',
                                      inputs: {
                                        IF0: {
                                          block: {
                                            type: 'spacecode_isKeyPressed',
                                            id: 'guY*VA)-$)X4q}C$mYt?',
                                            fields: { CODE: 'q' }
                                          }
                                        },
                                        DO0: {
                                          block: {
                                            type: 'spacecode_setAttribute',
                                            id: 'dYage3$(XRhe;~iS*iAZ',
                                            fields: {
                                              ATTRIBUTE: 'x',
                                              NAME: 'à'
                                            },
                                            inputs: {
                                              NAME: {
                                                block: {
                                                  type: 'math_arithmetic',
                                                  id: 'Q#Pt|#pvzgu~m8-k./_g',
                                                  fields: { OP: 'ADD' },
                                                  inputs: {
                                                    A: {
                                                      block: {
                                                        type: 'spacecode_getAttribute',
                                                        id: '9p}pjBk5jCevgyW.ki!^',
                                                        fields: {
                                                          ATTRIBUTE: 'y'
                                                        }
                                                      }
                                                    },
                                                    B: {
                                                      block: {
                                                        type: 'math_number',
                                                        id: 'hL)TVl,wmX8oFP:2Y(xG',
                                                        fields: { NUM: 30 }
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
                                          id: 'SNceE6p)2D:L^SiV%]o|',
                                          fields: { DIRECTION: 'forward' },
                                          next: {
                                            block: {
                                              type: 'spacecode_move',
                                              id: 'C=GhY-V8e}v88/K=UXR#',
                                              fields: { DIRECTION: 'forward' },
                                              next: {
                                                block: {
                                                  type: 'spacecode_shoot',
                                                  id: '{?n~:?)H/s*h!]OE)Tfn'
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
