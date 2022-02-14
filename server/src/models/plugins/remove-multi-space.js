const removeMultiSpace = (schema, _options) => {
  let fields = [];

  schema.eachPath(function (pathname, schemaType) {
    if (schemaType.instance === 'String' && schemaType.options.trim) {
      fields.push(pathname);
    }
  });

  schema.pre('save', async function (next) {
    const doc = this;
    for (let f of fields) {
      if (doc[f]) {
        doc[f] = doc[f].replace(/\s+/g, ' ').trim();
      }
    }
    next();
  });
};

/**
 * @module remove-multi-space
 * @author Khanh Lam <quockhanhdev@gmail.com>
 * @description A simple plugin for mongoose that removes multiple spaces from a string field.
 * @see https://mongoosejs.com/docs/middleware.html
 */
export default removeMultiSpace;