import Alpine from 'alpinejs'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const API_URL = 'http://localhost:3000/api'

document.addEventListener('alpine:init', () => {
  Alpine.data('consultationRequest', () => ({
    currentStep: 1,
    clinics: [
      { id: 1, name: 'العيادة العامة' },
      { id: 2, name: 'عيادة الباطنية' },
      { id: 3, name: 'عيادة الأطفال' },
      { id: 4, name: 'عيادة النساء والولادة' }
    ],
    doctors: [],
    appointments: [],
    formData: {
      name: '',
      birthDate: '',
      gender: '',
      mobile: '',
      nationalId: '',
      description: '',
      symptomsDuration: '',
      clinic: '',
      doctor: '',
      appointment: '',
      files: []
    },

    nextStep() {
      if (this.validateCurrentStep()) {
        this.currentStep++
      }
    },

    previousStep() {
      this.currentStep--
    },

    validateCurrentStep() {
      // Add validation logic for each step
      switch (this.currentStep) {
        case 1:
          return this.formData.name && 
                 this.formData.birthDate && 
                 this.formData.gender && 
                 this.formData.mobile && 
                 this.formData.nationalId
        case 2:
          return this.formData.description && 
                 this.formData.symptomsDuration
        case 3:
          return this.formData.clinic && 
                 this.formData.doctor && 
                 this.formData.appointment
        default:
          return true
      }
    },

    async loadDoctors() {
      // Simulated API call to load doctors based on selected clinic
      this.doctors = [
        { id: 1, name: 'د. أحمد محمد' },
        { id: 2, name: 'د. سارة أحمد' },
        { id: 3, name: 'د. خالد العمري' }
      ]
      this.formData.doctor = ''
      this.appointments = []
    },

    async loadAppointments() {
      // Simulated API call to load available appointments
      this.appointments = [
        { id: 1, time: '٩:٠٠ صباحاً - الأحد ٢٠٢٤/٠٣/١٠' },
        { id: 2, time: '١١:٣٠ صباحاً - الأحد ٢٠٢٤/٠٣/١٠' },
        { id: 3, time: '٢:٠٠ مساءً - الإثنين ٢٠٢٤/٠٣/١١' }
      ]
    },

    handleFileUpload(event) {
      this.formData.files = Array.from(event.target.files)
    },

    getClinicName(id) {
      const clinic = this.clinics.find(c => c.id === parseInt(id))
      return clinic ? clinic.name : ''
    },

    getDoctorName(id) {
      const doctor = this.doctors.find(d => d.id === parseInt(id))
      return doctor ? doctor.name : ''
    },

    getAppointmentTime(id) {
      const appointment = this.appointments.find(a => a.id === parseInt(id))
      return appointment ? appointment.time : ''
    },

    async submitForm() {
      try {
        const formData = new FormData()
        
        // Append form data
        Object.keys(this.formData).forEach(key => {
          if (key !== 'files') {
            formData.append(key, this.formData[key])
          }
        })

        // Append files
        this.formData.files.forEach(file => {
          formData.append('files', file)
        })

        const response = await fetch(`${API_URL}/consultations`, {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          alert('تم تقديم طلب الاستشارة بنجاح')
          window.location.href = '/'
        } else {
          throw new Error('فشل في تقديم الطلب')
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        alert('حدث خطأ أثناء تقديم الطلب. الرجاء المحاولة مرة أخرى.')
      }
    }
  }))
})

Alpine.start()