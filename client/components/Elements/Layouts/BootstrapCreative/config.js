export default {
  SLOT_NAMES: ["brandName", "header", "headerDesc", "headerMenu", "sections"],
  NAME: "Bootstrap Creative",
  ICON: "assets/screenshot.png",
  DEFAULT_SLOTS_ELEMENTS: {
    brandName: {
      type: "Label",
      props: {
        content: "Edit brand name",
        href: "#page-top"
      }
    },
    header: {
      type: "PlainLabel",
      props: {
        content: "Edit header"
      }
    },
    headerDesc: {
      type: "Label",
      props: {
        content: "Edit description"
      }
    },
    headerMenu: {
      type: "List",
      props: {
        cssClasses: "navbar-nav",
        tag: "ul",
        cssClassesItem: "nav-item",
        tagItem: "li"
      },
      DEFAULT_SLOTS_ELEMENTS: {
        items: [
          {
            type: "ListItem",
            props: {
              order: 1
            },
            DEFAULT_SLOTS_ELEMENTS: {
              content: {
                type: "Label",
                props: {
                  content: "About"
                }
              }
            }
          },
          {
            type: "ListItem",
            props: {
              order: 2
            },
            DEFAULT_SLOTS_ELEMENTS: {
              content: {
                type: "Label",
                props: {
                  content: "Services"
                }
              }
            }
          },
          {
            type: "ListItem",
            props: {
              order: 3
            },
            DEFAULT_SLOTS_ELEMENTS: {
              content: {
                type: "Label",
                props: {
                  content: "Portfolio"
                }
              }
            }
          },
          {
            type: "ListItem",
            props: {
              order: 3
            },
            DEFAULT_SLOTS_ELEMENTS: {
              content: {
                type: "Label",
                props: {
                  content: "Contact"
                }
              }
            }
          }
        ]
      }
    },
    sections: {
      type: "Grid",
      props: {
        marginX: 0,
        marginY: 0,
        colNum: 4,
        rowHeight: 100
      },
      DEFAULT_SLOTS_ELEMENTS: {
        items: [
          {
            type: "GridItem",
            props: {
              x: 0,
              y: 0,
              w: 4,
              h: 3,
              i: "primary",
              cssBackgroundColor: "#f05f40"
            }
          },
          {
            type: "GridItem",
            props: {
              x: 0,
              y: 4,
              w: 4,
              h: 2,
              i: "services",
              cssBackgroundColor: "#212529"
            }
          }
        ]
      }
    }
  }
};
