module.exports = function(database, model) {
  return async function (ctx, next) {
    const {fields, select, sort, page, size} = ctx.query;

    ctx.body = await database[model].findAndCountAll({
      attributes: fields == '*' ? undefined : JSON.parse(fields),
      where: JSON.parse(select),
      order: JSON.parse(sort),
      offset: (page-1)*size,
      limit: size,
    });
  };
};
