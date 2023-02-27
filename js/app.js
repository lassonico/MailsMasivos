document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    const inputEmail = document.querySelector('#email');
    const imailAlterno = document.querySelector('#correo');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btn = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const modal = document.querySelector('#modal');
    const spenner = document.querySelector('#spenner');
    const modalText = document.querySelector('#modal-msg');
    const btnPrincipal = document.querySelector('#cerrar-modal')
    const btnCerra = document.querySelector('.cerrar');
    

    inputEmail.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar)
    btnCerra.addEventListener('click', cerrarModal)
    btnPrincipal.addEventListener('click', cerrarModal)
    formulario.addEventListener('submit', enviandoForm)
    imailAlterno.addEventListener('input', validarEmailAlt)

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetForm();
    })

    function validar(e){
    
        if([e.target.value].includes('')){
            validando(`El ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail()
            return
        }
        
        if( e.target.id === 'email' && !validarEmail(e.target.value)){
            validando('El correo no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail()
            inputEmail.focus()
            return
        }

        if( e.target.id === 'mensaje' && inputMensaje.value.length < 10 ){
            validando('El mensaje es invalido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail()
            inputMensaje.focus()
            return
        }

        limpiarAlerta(e.target.parentElement)
        email[e.target.name] = e.target.value.trim('').toLowerCase();
        comprobarEmail()
    }

    function validarEmailAlt(e){
        if(imailAlterno.value.length > 0){
            if(!validarEmail(e.target.value)){
                validando(`El correo no es un correo valido`, e.target.parentElement);
                return
            }
            limpiarAlerta(e.target.parentElement)
        }
        limpiarAlerta(e.target.parentElement)
    }

    const validando = (mensaje, campo) => {
        limpiarAlerta(campo)

        const error = document.createElement('P')
        error.textContent = mensaje;
        error.classList.add('text-red', 'p-2', 'text-center', 'font-bold', 'border', 'border-red', 'rounded-lg')
        
        campo.appendChild(error)
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.text-red');
        if(alerta){alerta.remove()}
    }

    function validarEmail(email){
        const expex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = expex.test(email);
        return resultado
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btn.classList.add('opacity-50');
            btn.disabled = true;
            return
        }
        btn.classList.remove('opacity-50');
        btn.disabled = false;
    }

    function mostrarSpinner(){
        spenner.classList.remove('hidden')
        setTimeout(() => {
            spenner.classList.add('hidden')
            modalText.classList.remove('hidden');
        }, 5000);
    }
    function mostrarModal(){
        modal.classList.add('flex')
        modal.classList.remove('hidden')
        resetForm();
    }
    function cerrarModal(e){
        e.preventDefault()
        modal.classList.add('hidden');
        spenner.classList.add('hidden');
        modalText.classList.add('hidden');
        resetForm();
    }
    function enviandoForm(e){
        e.preventDefault()
        spenner.classList.add('hidden');
        modalText.classList.add('hidden');
        mostrarModal();
        mostrarSpinner();
    }

    function resetForm(){
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
})