<script>
  export default {
    name: 'modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
        <button
            type="button"
            class="btn-close"
            @click="close"
        >
            x
        </button>
        <section class="modal-header">
            <slot name="header">
                <p>Error al iniciar sesión</p>
            </slot>
        </section>

        <section class="modal-body">
            <slot name="body">
                <p>Ups! Algo salió mal 😕. Revisa tus credenciales e intentalo de nuevo.</p>
            </slot>
        </section>
      
    </div>
  </div>
</template>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    padding: 1em 1.5em;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #3d77e2;
    justify-content: space-between;
    font-family: "DM Sans";
    font-weight: 600;
    font-size: 1.5rem;
  }
  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 2em 1.5em;
    font-family: "DM Sans";
    font-weight: 500;
    font-size: 1.2rem;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 1em;
    border: none;
    font-size: 40px;
    padding: 1em;
    cursor: pointer;
    font-weight: bold;
    color: #ff7158;
    background: transparent;
    
  }
</style>