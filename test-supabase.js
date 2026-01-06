// Script simple para probar la conexión a Supabase
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Leer variables de entorno del archivo .env
function loadEnv() {
  try {
    const envContent = readFileSync('.env', 'utf-8')
    const envVars = {}
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim()
        }
      }
    })
    return envVars
  } catch (error) {
    console.error('Error leyendo .env:', error.message)
    return {}
  }
}

const env = loadEnv()
const supabaseUrl = env.VITE_SUPABASE_URL
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY

console.log('🔍 Verificando configuración...\n')
console.log('URL:', supabaseUrl || '❌ No configurada')
console.log('Anon Key:', supabaseAnonKey ? `✅ Configurada (${supabaseAnonKey.substring(0, 30)}...)` : '❌ No configurada\n')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Faltan variables de entorno. Verifica tu archivo .env')
  process.exit(1)
}

console.log('\n🔌 Conectando a Supabase...')
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Probar conexión
async function testConnection() {
  try {
    console.log('\n📊 Verificando tabla "leads"...')
    
    // Intentar hacer un SELECT simple
    const { data, error } = await supabase
      .from('leads')
      .select('id')
      .limit(1)

    if (error) {
      if (error.code === 'PGRST301' || error.message.includes('permission denied') || error.message.includes('row-level security')) {
        console.log('⚠️  Error de permisos (RLS):', error.message)
        console.log('💡 Esto es normal si no tienes política de SELECT configurada.')
        console.log('   El formulario debería funcionar (INSERT), pero el Dashboard necesitará la política de SELECT.\n')
      } else if (error.message.includes('relation') && error.message.includes('does not exist')) {
        console.error('❌ Error: La tabla "leads" no existe.')
        console.log('💡 Crea la tabla en Supabase usando el SQL del archivo SUPABASE_SETUP.md\n')
        return false
      } else {
        console.error('❌ Error:', error.message)
        console.error('   Código:', error.code, '\n')
        return false
      }
    } else {
      console.log('✅ Conexión exitosa!')
      console.log('✅ La tabla "leads" existe y es accesible\n')
    }
    
    // Probar inserción
    console.log('🧪 Probando inserción de un lead de prueba...')
    const testLead = {
      nombre: 'Test Connection',
      email: 'test@example.com',
      telefono: '+1234567890',
      respuestas: { test: 1 },
      puntuacion: 5
    }

    const { data: insertData, error: insertError } = await supabase
      .from('leads')
      .insert([testLead])
      .select()

    if (insertError) {
      if (insertError.code === 'PGRST301' || insertError.message.includes('permission denied') || insertError.message.includes('row-level security')) {
        console.error('❌ Error de permisos al insertar:', insertError.message)
        console.log('💡 Verifica que tengas la política de INSERT configurada:')
        console.log('   CREATE POLICY "Permitir inserción pública de leads"')
        console.log('   ON leads FOR INSERT TO anon, authenticated WITH CHECK (true);\n')
        return false
      } else {
        console.error('❌ Error al insertar:', insertError.message, '\n')
        return false
      }
    }

    console.log('✅ Inserción exitosa!')
    console.log('   Lead ID:', insertData[0].id)
    
    // Limpiar el lead de prueba
    console.log('\n🧹 Limpiando lead de prueba...')
    const { error: deleteError } = await supabase
      .from('leads')
      .delete()
      .eq('id', insertData[0].id)
    
    if (deleteError) {
      console.log('⚠️  No se pudo eliminar el lead de prueba (puedes eliminarlo manualmente)')
    } else {
      console.log('✅ Lead de prueba eliminado')
    }
    
    console.log('\n🎉 ¡Conexión verificada exitosamente!')
    console.log('✅ Tu aplicación está lista para usar\n')
    return true

  } catch (err) {
    console.error('❌ Error inesperado:', err.message, '\n')
    return false
  }
}

testConnection()
  .then(success => {
    process.exit(success ? 0 : 1)
  })
  .catch(err => {
    console.error('❌ Error fatal:', err)
    process.exit(1)
  })

