const Router = require('koa-router')
const Validator = require('koa-context-validator');
const database = require('./database');

const login = require('./apis/login');
const get_data_list = require('./apis/get_data_list');
const get_class_info = require('./apis/get_class_info');
const get_class_list = require('./apis/get_class_list');
const adjust_lesson = require('./apis/adjust_lesson');

const public = new Router({prefix: '/api'});
const protected = new Router({prefix: '/api'});

const validator = Validator.default;
const {object, number, string} = Validator;

// public routes
public.get('/', function (ctx, next) {
  ctx.body = '课和家 API Server';
});

public.post('/login', validator({
  body: object().keys({
    mobile: string().required(),
    password: string().required(),
  })
}), login(database));

database.models.forEach(function(model) {
  public.get('/' + model, validator({
    query: object().keys({
      fields: string().optional().default("*"),
      select: string().optional().default("{}"),
      sort: string().optional().default("[]"),
      page: number().min(1).optional().default(1),
      size: number().min(1).max(100).optional().default(10),
    })
  }), get_data_list(database, model));
});

// protected routes
protected.get('/classes/:classId', get_class_info(database));

protected.get('/classes', validator({
  query: object().keys({
    type: string().optional(),
    page: number().min(1).optional().default(1),
    size: number().min(1).max(100).optional().default(10),
  })
}), get_class_list(database));

protected.post('/student/adjustLesson', validator({
  body: object().keys({
    studentId: number().required(),
    fromClassId: number().required(),
    fromLessonId: number().required(),
    toClassId: number().required(),
  })
}), adjust_lesson(database));

module.exports = {
  public: public.routes(),
  protected: protected.routes(),
};
