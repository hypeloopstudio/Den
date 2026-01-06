// Script para probar la funcionalidad del Dashboard (lectura de leads)
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Leer variables de entorno
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

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Faltan variables de entorno')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testDashboard() {
  console.log('📊 Probando funcionalidad del Dashboard...\n')
  
  try {
    // Probar lectura de leads ordenados por fecha
    console.log('🔍 Intentando leer leads ordenados por fecha...')
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      if (error.code === 'PGRST301' || error.message.includes('permission denied') || error.message.includes('row-level security')) {
        console.error('❌ Error de permisos al leer:', error.message)
        console.log('💡 Necesitas crear la política de SELECT:')
        console.log('   CREATE POLICY "Permitir lectura de leads"')
        console.log('   ON leads FOR SELECT TO anon, authenticated USING (true);\n')
        return false
      } else {
        console.error('❌ Error:', error.message, '\n')
        return false
      }
    }

    console.log('✅ Lectura exitosa!')
    console.log(`   Total de leads encontrados: ${data.length}\n`)
    
    if (data.length > 0) {
      console.log('📋 Primeros 3 leads:')
      data.slice(0, 3).forEach((lead, index) => {
        console.log(`   ${index + 1}. ${lead.nombre} - ${lead.email} (${lead.puntuacion} puntos)`)
        console.log(`      Creado: ${new Date(lead.created_at).toLocaleString('es-ES')}`)
      })
    } else {
      console.log('ℹ️  No hay leads en la base de datos aún.')
      console.log('   Esto es normal si acabas de configurar la aplicación.\n')
    }
    
    console.log('✅ Dashboard funcionando correctamente!')
    console.log('✅ Puedes acceder a /dashboard en tu aplicación\n')
    return true

  } catch (err) {
    console.error('❌ Error inesperado:', err.message, '\n')
    return false
  }
}

testDashboard()
  .then(success => {
    process.exit(success ? 0 : 1)
  })
  .catch(err => {
    console.error('❌ Error fatal:', err)
    process.exit(1)
  })

