import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Calendar, User, Wifi } from 'lucide-react';

const LaundryReservationSystem = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [userName, setUserName] = useState('');
  const [showReservation, setShowReservation] = useState(false);

  // Estado das máquinas (disponível, ocupada, reservada)
  const [machines, setMachines] = useState({
    washers: [
      { id: 1, status: 'available', reservedBy: null, timeSlot: null },
      { id: 2, status: 'occupied', reservedBy: 'João Silva', timeSlot: '14:00-15:30', timeLeft: '45 min' },
      { id: 3, status: 'reserved', reservedBy: 'Maria Santos', timeSlot: '16:00-17:30' },
      { id: 4, status: 'available', reservedBy: null, timeSlot: null }
    ],
    dryers: [
      { id: 1, status: 'available', reservedBy: null, timeSlot: null },
      { id: 2, status: 'occupied', reservedBy: 'Pedro Costa', timeSlot: '15:00-16:00', timeLeft: '20 min' }
    ]
  });

  const timeSlots = [
    '08:00-09:30', '09:30-11:00', '11:00-12:30', '12:30-14:00',
    '14:00-15:30', '15:30-17:00', '17:00-18:30', '18:30-20:00',
    '20:00-21:30', '21:30-23:00'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'border-green-500 bg-green-500/10';
      case 'occupied': return 'border-orange-500 bg-orange-500/10';
      case 'reserved': return 'border-red-500 bg-red-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'occupied': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'reserved': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Disponível';
      case 'occupied': return 'Em uso';
      case 'reserved': return 'Reservada';
      default: return '';
    }
  };

  const handleReservation = () => {
    if (!selectedMachine || !selectedTime || !userName) return;

    const [type, id] = selectedMachine.split('-');
    const updatedMachines = { ...machines };
    const machineIndex = updatedMachines[type].findIndex(m => m.id === parseInt(id));
    
    updatedMachines[type][machineIndex] = {
      ...updatedMachines[type][machineIndex],
      status: 'reserved',
      reservedBy: userName,
      timeSlot: selectedTime
    };

    setMachines(updatedMachines);
    setSelectedMachine(null);
    setSelectedTime('');
    setUserName('');
    setShowReservation(false);
  };

  const openReservation = (type, id, status) => {
    if (status === 'available') {
      setSelectedMachine(`${type}-${id}`);
      setShowReservation(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Toca da Raposa</h1>
                <p className="text-gray-400 text-sm">Sistema de Reserva de Lavanderia</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>Hoje, 08 de Junho</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Máquinas de Lavar */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <div className="w-2 h-6 bg-orange-500 rounded mr-3"></div>
            Máquinas de Lavar (4 unidades)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {machines.washers.map((machine) => (
              <div
                key={machine.id}
                className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${getStatusColor(machine.status)}`}
                onClick={() => openReservation('washers', machine.id, machine.status)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Máquina {machine.id}</h3>
                  {getStatusIcon(machine.status)}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{getStatusText(machine.status)}</p>
                  {machine.reservedBy && (
                    <p className="text-xs text-gray-400">
                      <User className="w-3 h-3 inline mr-1" />
                      {machine.reservedBy}
                    </p>
                  )}
                  {machine.timeSlot && (
                    <p className="text-xs text-gray-400">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {machine.timeSlot}
                    </p>
                  )}
                  {machine.timeLeft && (
                    <div className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs">
                      Resta: {machine.timeLeft}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Máquinas de Secar */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <div className="w-2 h-6 bg-orange-500 rounded mr-3"></div>
            Máquinas de Secar (2 unidades)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {machines.dryers.map((machine) => (
              <div
                key={machine.id}
                className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${getStatusColor(machine.status)}`}
                onClick={() => openReservation('dryers', machine.id, machine.status)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Secadora {machine.id}</h3>
                  {getStatusIcon(machine.status)}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">{getStatusText(machine.status)}</p>
                  {machine.reservedBy && (
                    <p className="text-xs text-gray-400">
                      <User className="w-3 h-3 inline mr-1" />
                      {machine.reservedBy}
                    </p>
                  )}
                  {machine.timeSlot && (
                    <p className="text-xs text-gray-400">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {machine.timeSlot}
                    </p>
                  )}
                  {machine.timeLeft && (
                    <div className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs">
                      Resta: {machine.timeLeft}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legenda */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Legenda</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Disponível para reserva</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-sm">Em uso no momento</span>
            </div>
            <div className="flex items-center space-x-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm">Reservada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Reserva */}
      {showReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-6">Fazer Reserva</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Seu Nome</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Digite seu nome"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Horário</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Selecione um horário</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleReservation}
                disabled={!userName || !selectedTime}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Confirmar Reserva
              </button>
              <button
                onClick={() => {
                  setShowReservation(false);
                  setSelectedMachine(null);
                  setSelectedTime('');
                  setUserName('');
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaundryReservationSystem;