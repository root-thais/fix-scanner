const express = require('express');
const router = express.Router();
const path = require('path');

const TicketController = require('../controllers/TicketController');

// Adicionando um ticket
router.post('/ad/ticket', TicketController.addTicket);

// Listando os tickets
router.get('/ad/list', TicketController.getTickets); 

// consultando e invalidando
router.get('/consult/invalidate/:sequencia', TicketController.consultAndInvalidateTicket);


router.get('/consult/ticket/:sequencia', TicketController.consultTicketPorSequence);

// gerando automaticamente do 1 ao 170
router.post('/create-initial-tickets', TicketController.createInitialTickets);


// Rota para acessar o scanner 
router.get('/scanner', (req, res) => {
  const filePath = path.join(__dirname, '/../templates/scanner.html');
  res.sendFile(filePath);
});

// Rota para acessar o gerador
router.get('/gerador', (req, res) => {
  const filePath = path.join(__dirname, '/../templates/gerador.html');
  res.sendFile(filePath);
});



module.exports = router;