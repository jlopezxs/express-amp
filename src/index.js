const ampify = require('ampify')

function expressAMP ({
  override = true
} = {}) {
  function renderAMP (req, res, next) {
    const renderCallback = callback => {
      return (err, html) => {
        if (err) {
          return next(err)
        }

        const htmlAMP = ampify(html, { cwd: 'amp' })
        res.send(htmlAMP)
      }
    }

    if (override === false) {
      res.renderAMP = function (view, renderOpts, callback) {
        this.render(view, renderOpts, renderCallback(callback))
      }
    } else {
      res.oldRenderMethod = res.render
      res.render = function (view, renderOpts, callback) {
        this.oldRenderMethod(view, renderOpts, renderCallback(callback))
      }
    }

    return next()
  }

  return (renderAMP)
};

module.exports = expressAMP
