document.addEventListener('DOMContentLoaded', function () {
    var toggleButtons = document.querySelectorAll('.toggle-password')
    toggleButtons.forEach(function (toggleButton) {
        var inputGroup = toggleButton.closest('.input-group')
        if (!inputGroup) return
        var passwordInput = inputGroup.querySelector('input[type="password"], input[type="text"]')
        var toggleIcon = toggleButton.querySelector('i')
        if (!passwordInput || !toggleIcon) return
        toggleButton.addEventListener('click', function () {
            var isPassword = passwordInput.type === 'password'
            passwordInput.type = isPassword ? 'text' : 'password'
            if (isPassword) {
                toggleIcon.classList.remove('bi-eye-slash')
                toggleIcon.classList.add('bi-eye')
            } else {
                toggleIcon.classList.remove('bi-eye')
                toggleIcon.classList.add('bi-eye-slash')
            }
        })
    })
})

(function(){
    function dismissFlash(el){
        if(!el) return
        el.style.animation = 'flash-out 180ms ease-in forwards'
        setTimeout(function(){ if(el && el.parentNode) el.parentNode.removeChild(el) }, 200)
    }
    function setupAuthFlash(){
        var container = document.querySelector('.flash-container-auth')
        if(!container) return
        var flashes = container.querySelectorAll('.flash')
        flashes.forEach(function(el){
            var timeout = el.classList.contains('flash-success') ? 6000 : 12000
            setTimeout(function(){ dismissFlash(el) }, timeout)
        })
    }
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupAuthFlash); else setupAuthFlash()
})()


