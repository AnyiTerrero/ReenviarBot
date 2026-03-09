<!DOCTYPE html>
<html>
<head>
    <title>Panel de Reenvío</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        body { font-family: 'Segoe UI', sans-serif; background: #121212; color: #e0e0e0; padding: 30px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .card { background: #1e1e1e; padding: 20px; border-radius: 12px; border: 1px solid #333; }
        input, textarea, select { width: 100%; padding: 12px; margin: 10px 0; background: #2a2a2a; border: 1px solid #444; color: white; border-radius: 6px; box-sizing: border-box; }
        button { width: 100%; padding: 12px; background: #25d366; border: none; color: black; font-weight: bold; border-radius: 6px; cursor: pointer; }
        .group-item { display: flex; align-items: center; padding: 8px; border-bottom: 1px solid #333; }
        .group-item input { width: auto; margin-right: 15px; }
    </style>
</head>
<body>
    <div id="app">
        <h1>📱 Panel de Control - Bot de Reenvío</h1>
        
        <div class="grid">
            <div class="card">
                <h3>📢 Nueva Campaña Independiente</h3>
                <textarea v-model="form.contenido" placeholder="Contenido del mensaje..." rows="5"></textarea>
                
                <div style="display:flex; gap:10px">
                    <input type="number" v-model="form.min" placeholder="Min seg">
                    <input type="number" v-model="form.max" placeholder="Max seg">
                </div>

                <h4>Selecciona los Grupos Destino:</h4>
                <div style="max-height: 200px; overflow-y: auto; background: #2a2a2a; padding: 10px; border-radius: 6px;">
                    <div v-for="g in grupos" :key="g.id" class="group-item">
                        <input type="checkbox" :value="g.id" v-model="form.grupos_ids">
                        <span>{{ g.nombre_grupo || 'ID Pendiente...' }}</span>
                    </div>
                </div>
                <button @click="crearCampaña" style="margin-top: 15px;">🚀 Lanzar Campaña</button>
            </div>

            <div class="card">
                <h3>🔗 Agregar Nuevo Grupo</h3>
                <input v-model="nuevo.nombre" placeholder="Nombre (Ej: Ventas Habana)">
                <input v-model="nuevo.enlace" placeholder="Link de invitación">
                <button @click="addGrupo" style="background: #3498db; color: white;">Añadir a la Base de Datos</button>

                <h3 style="margin-top: 30px;">📋 Grupos Registrados</h3>
                <div v-for="g in grupos" class="group-item">
                    <span>{{ g.nombre_grupo }}</span>
                    <span style="margin-left: auto; font-size: 12px; color: #888;">{{ g.activo ? '✅' : '❌' }}</span>
                </div>
            </div>
        </div>
    </div>

    <script>
        const { createApp, ref, onMounted } = Vue;
        createApp({
            setup() {
                const grupos = ref([]);
                const form = ref({ contenido: '', grupos_ids: [], min: 40, max: 100 });
                const nuevo = ref({ nombre: '', enlace: '' });

                const cargarData = () => fetch('/api/grupos').then(r => r.json()).then(d => grupos.value = d);

                const addGrupo = () => {
                    fetch('/api/grupos', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(nuevo.value)
                    }).then(() => { nuevo.value = {nombre:'', enlace:''}; cargarData(); });
                };

                const crearCampaña = () => {
                    if (form.value.grupos_ids.length === 0) return alert('Selecciona al menos un grupo');
                    fetch('/api/campanas', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(form.value)
                    }).then(() => { 
                        alert('¡Campaña creada y enviada al Bot!');
                        form.value = { contenido: '', grupos_ids: [], min: 40, max: 100 };
                    });
                };

                onMounted(cargarData);
                return { grupos, form, nuevo, addGrupo, crearCampaña }
            }
        }).mount('#app');
    </script>
</body>
</html>

