let flexSpec = require('./flex-spec')
let Declaration = require('../declaration')

class JustifyContent extends Declaration {
  static names = ['justify-content', 'flex-pack', 'box-pack']

  static oldValues = {
    'flex-end': 'end',
    'flex-start': 'start',
    'space-between': 'justify',
    'space-around': 'distribute'
  }

  /**
   * Change property name for 2009 and 2012 specs
   */
  prefixed (prop, prefix) {
    let spec;
    [spec, prefix] = flexSpec(prefix)
    if (spec === 2009) {
      return prefix + 'box-pack'
    } else if (spec === 2012) {
      return prefix + 'flex-pack'
    } else {
      return super.prefixed(prop, prefix)
    }
  }

  /**
   * Return property name by final spec
   */
  normalize () {
    return 'justify-content'
  }

  /**
   * Change value for 2009 and 2012 specs
   */
  set (decl, prefix) {
    let spec = flexSpec(prefix)[0]
    if (spec === 2009 || spec === 2012) {
      let value = JustifyContent.oldValues[decl.value] || decl.value
      decl.value = value
      if (spec !== 2009 || value !== 'distribute') {
        return super.set(decl, prefix)
      }
    } else if (spec === 'final') {
      return super.set(decl, prefix)
    }
    return undefined
  }
}

module.exports = JustifyContent