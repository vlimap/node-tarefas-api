import mongoose from 'mongoose';
import moment from 'moment-timezone';

// fuso horario pertinente aqui de Natal Recife
const timezone = 'America/Recife';

const tarefaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título é obrigatório.'],
    trim: true,
    minlength: [3, 'O título deve ter pelo menos 3 caracteres.'],
    maxlength: [50, 'O título deve ter no máximo 50 caracteres.']
  },
  descricao: {
    type: String,
    trim: true,
    maxlength: [255, 'A descrição deve ter no máximo 255 caracteres.']
  },
  prioridade: {
    type: String,
    enum: {
      values: ['Baixa', 'Média', 'Alta'],
      message: 'Prioridade deve ser "Baixa", "Média" ou "Alta".'
    },
    required: [true, 'A prioridade é obrigatória.']
  },
  data: {
    type: Date,
    required: [true, 'A data de entrega é obrigatória.'],
    validate: {
      validator: function(value) {
        const today = moment().tz(timezone).startOf('day');
        const dataSelecionada = moment(value).tz(timezone).startOf('day');
        return dataSelecionada.isSameOrAfter(today);
      },
      message: 'A data de entrega deve ser hoje ou no futuro.'
    }
  },
  responsaveis: {
    type: [String],
    required: [true, 'É necessário informar pelo menos um responsável.'],
    validate: {
      validator: arrayLimit,
      message: 'É necessário informar pelo menos uma pessoa responsável.'
    }
  },
  criadoEm: {
    type: Date,
    default: () => moment().tz(timezone).toDate()
  },
  atualizadoEm: {
    type: Date,
    default: () => moment().tz(timezone).toDate()
  }
});

// Função de validação para o campo responsaveis
function arrayLimit(val) {
  return val.length > 0;
}

// Middleware para atualizar o campo atualizadoEm antes de salvar
tarefaSchema.pre('save', function (next) {
  this.atualizadoEm = moment().tz(timezone).toDate();
  next();
});

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

export default Tarefa;
