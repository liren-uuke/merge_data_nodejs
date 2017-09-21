module.exports = function(database) {
  return async function (ctx, next) {
    const {type, page, size} = ctx.query;

    const filter = function(classType) {
      switch(classType) {
        case 'offline':
          return {online_type: 0};
        case 'online':
          return {online_type: 1};
        default:
          return {};
      }
    }(type);

    ctx.body = await database.class_info.findAndCountAll({
      where: filter,
      offset: (page-1)*size,
      limit: size,
    });
  };
};
