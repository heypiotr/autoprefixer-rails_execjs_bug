let Declaration = require('../declaration')
let utils = require('./grid-utils')

class GridArea extends Declaration {
  static names = ['grid-area']

  /**
   * Translate grid-area to separate -ms- prefixed properties
   */
  insert (decl, prefix, prefixes) {
    if (prefix !== '-ms-') return super.insert(decl, prefix, prefixes)

    let values = utils.parse(decl)

    let [rowStart, rowSpan] = utils.translate(values, 0, 2)
    let [columnStart, columnSpan] = utils.translate(values, 1, 3);

    [
      ['grid-row', rowStart],
      ['grid-row-span', rowSpan],
      ['grid-column', columnStart],
      ['grid-column-span', columnSpan]
    ].forEach(([prop, value]) => {
      utils.insertDecl(decl, prop, value)
    })

    return undefined
  }
}

module.exports = GridArea
