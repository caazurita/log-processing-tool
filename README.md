# LOG-PROCESSING-TOOL

**Procesar logs Node.js + TypeScrip**

## Este proyecto consiste de un sistema para leer y procesar archivos logs:

- Leer archivo `.txt`.
- Identificar y contar mensajes de error (por ejemplo `[error]`, `(error)`, `ERROR`, etc.)
- Generar un archivo `.txt` con los resultados

## Stack

| Tipo          | Herramientas                               |
| ------------- | ------------------------------------------ |
| src           | Node.js + Ts + File System |


### Instalar dependencies
```bash
npm install
```


### Ejecutar el proyecto en modo desarrollo

```bash
npm run dev
```


### 6. Archivos importantes

- `src/index.ts` → Punto de entrada del proyecto
- `src/utils/logProcessor.ts` → Lógica de procesamiento de logs
- `src/data/logs/log.txt` → Archivo de logs de entrada
- `src/data/reports/report-1770414318630.txt` → Archivo generado con los resultados



## Explicación del diseño

El diseño sigue una estructura simple:

- Leer archivos usando el módulo `fs`
- Normalización de logs mediante expresiones regulares para detectar errores sin importar el formato (`ERROR`, `[error]`, `(error)`, etc.)
- Conteo de mensajes usando un `Map` para agrupar errores repetidos
- Salida a archivo en formato texto


## Tradeoffs y supuestos

- Se asume que los logs están en formato de texto plano y sigue un formato log docker
- No se maneja aún procesamiento en streaming para archivos extremadamente grandes
- El formato de salida es `.txt` por simplicidad

## Qué mejoraría con más tiempo

Con más tiempo, se podrían agregar:

- Soporte para múltiples fromatos Log.
- Exportación a formatos como JSON o CSV


## Uso de herramientas de IA

Se utilizaron herramientas de IA para:

- Buscar expresiones regulares dentro la funcion `ReadAndProcessLog` para detectar errores en diferentes formatos
- Contar la catidad de errores mas recurrente.
- Aplicar diseño basico para generar el reporte txt




