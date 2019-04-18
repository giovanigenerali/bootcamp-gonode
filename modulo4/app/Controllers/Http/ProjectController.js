'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index ({ request, response }) {
    try {
      const { page } = request.get()

      const projects = await Project.query()
        .with('user')
        .paginate(page)

      return projects
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Nenhum projeto encontrado!' } })
    }
  }

  async store ({ request, response, auth }) {
    try {
      const data = request.only(['title', 'description'])

      const project = await Project.create({ ...data, user_id: auth.user.id })

      return project
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Ocorreu algum erro ao criar o projeto!' } })
    }
  }

  async show ({ params, response }) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.load('user')
      await project.load('tasks')

      return project
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Projeto não encontrado!' } })
    }
  }

  async update ({ params, request, response }) {
    try {
      const project = await Project.findOrFail(params.id)
      const data = request.only(['title', 'description'])

      project.merge(data)

      await project.save()

      return project
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Ocorreu algum erro ao atualizar o projeto!' }
      })
    }
  }

  async destroy ({ params, response }) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.delete()
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Ocorreu algum erro ao deletar o projeto!' }
      })
    }
  }
}

module.exports = ProjectController
