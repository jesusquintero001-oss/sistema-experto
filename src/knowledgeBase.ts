export interface Option {
  label: string;
  nextStep?: string;
  diagnosis?: string;
  solution?: string;
}

export interface Rule {
  id: string;
  category: 'hardware' | 'software';
  symptom: string;
  options: Option[];
}

export const knowledgeBase: Record<string, Rule> = {
  start: {
    id: 'start',
    category: 'hardware',
    symptom: '¿Qué tipo de problema estás experimentando en el equipo?',
    options: [
      { label: 'Problema físico o de encendido (Hardware)', nextStep: 'hardware_power' },
      { label: 'Problema del sistema operativo o programas (Software)', nextStep: 'software_issues' },
    ],
  },
  hardware_power: {
    id: 'hardware_power',
    category: 'hardware',
    symptom: '¿El equipo enciende o muestra alguna luz/sonido?',
    options: [
      {
        label: 'No enciende para nada, totalmente apagado',
        diagnosis: 'Falla en la Fuente de Poder (PSU) o en la Placa Madre.',
        solution: 'Verifica la conexión del cable de corriente, prueba otro tomacorriente o revisa la fuente de alimentación.',
      },
      {
        label: 'Enciende pero emite pitidos o no da imagen',
        diagnosis: 'Falla en la Memoria RAM o Tarjeta de Video.',
        solution: 'Apaga el equipo, retira los módulos RAM, limpia los pines dorados con un borrador limpio e insértalos de nuevo.',
      },
    ],
  },
  software_issues: {
    id: 'software_issues',
    category: 'software',
    symptom: '¿Cuál es el comportamiento anormal del software?',
    options: [
      {
        label: 'Aparece pantalla azul (BSOD) o reinicios inesperados',
        diagnosis: 'Controladores corruptos o fallo crítico en el disco de almacenamiento.',
        solution: 'Inicia en Modo Seguro, actualiza los drivers o ejecuta `sfc /scannow` en la consola como Administrador.',
      },
      {
        label: 'El equipo está extremadamente lento y el disco/RAM está al 100%',
        diagnosis: 'Infección por Malware o demasiados procesos en segundo plano.',
        solution: 'Abre el Administrador de tareas, deshabilita programas de inicio y pasa un escaneo de antivirus completo.',
      },
    ],
  },
};