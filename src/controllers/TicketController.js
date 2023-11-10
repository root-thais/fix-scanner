const Ticket = require('../models/Tickect');

// Função para adicionar um ticket ao banco de dados
const addTicket = async (req, res) => {
  try {
    const { sequencia } = req.body;

    const existingTicket = await Ticket.findOne({ sequencia });


    if (existingTicket) {
      return res.status(400).json({ error: 'Este ticket já existe' });
    }

    const newTicket = new Ticket({
      sequencia,
      status: false, // Inicialmente, definimos o status como falso (não consultado)
    });

    await newTicket.save();

    res.json(newTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar o ticket' });
  }
};
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar os tickets' });
  }
};


// Função para marcar um ticket como consultado e torná-lo inválido
const consultAndInvalidateTicket = async (req, res) => {
  try {
    const { sequencia } = req.params;
    const ticket = await Ticket.findOne({ sequencia: sequencia });

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket não encontrado' });
    }

    if (ticket.status) {
      return res.status(400).json({ error: 'Este ticket já foi consultado e é inválido' });
    }

    // Marque o ticket como consultado e inválido
    ticket.status = true;
    await ticket.save();

    res.json({ message: 'Ticket consultado e tornou-se inválido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao marcar o ticket como consultado' });
  }
};

const consultTicketPorSequence = async (req, res) => {
  try {
    const { sequencia } = req.params;
    const ticket = await Ticket.findOne({ sequencia: sequencia });

    if (ticket) {
      return res.status(200).json({ response: 'O Ticket existe no bd' });
    } else {
      return res.status(404).json({ response: 'O Ticket Não existe no bd' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao marcar o ticket como consultado' });
  }
}

// Função para verificar e criar automaticamente os números de sequência de 1 a 170

const createInitialTickets = async (req, res) => {
  try {
    for (let i = 1; i <= 170; i++) {
      const existingTicket = await Ticket.findOne({ sequencia: i });

      if (!existingTicket) {
        const newTicket = new Ticket({
          sequencia: i,
          status: false,
        });
        await newTicket.save();
      }
    }

    res.json({ message: 'Tickets de 1 a 170 criados automaticamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar tickets automaticamente' });
  }
};


module.exports = {
  addTicket,
  getTickets,
  consultAndInvalidateTicket,
  createInitialTickets,
  consultTicketPorSequence
};