'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index ({ params }) {
    const tasks = await Task.query()
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()

    return tasks
  }

  async store ({ params, request }) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    const task = await Task.create({ ...data, project_id: params.projects_id })

    return task
  }

  async show ({ params, response }) {
    try {
      const task = await Task.findOrFail(params.id)

      return task
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Task não encontrada!' } })
    }
  }

  async update ({ params, request, response }) {
    try {
      const task = await Task.findOrFail(params.id)
      const data = request.only([
        'user_id',
        'title',
        'description',
        'due_date',
        'file_id'
      ])

      task.merge(data)

      await task.save()

      return task
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Ocorreu algum erro ao atualizar a task!' }
      })
    }
  }

  async destroy ({ params, response }) {
    try {
      const task = await Task.findOrFail(params.id)

      await task.delete()
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Ocorreu algum erro ao deletar a task!' }
      })
    }
  }
}

module.exports = TaskController
