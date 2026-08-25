# Plan: Migrar el Agente Diagnóstico LAIA a Lovable AI Gateway

## Objetivo
Cambiar el backend del chat de diagnóstico para que use **Lovable AI Gateway** en lugar de la API directa de OpenAI, consumiendo los créditos de IA del workspace y respetando las reglas de integración del gateway.

## Estado actual verificado
- `LOVABLE_API_KEY` ya existe en los secretos del proyecto.
- `OPENAI_API_KEY` también existe, pero solo se usa en `src/lib/laia-agent.functions.ts`.
- Las dependencias `ai` y `@ai-sdk/openai` ya están instaladas.
- El chat actual usa `generateText` con `gpt-4o-mini` y salida estructurada (`Output.object`).

## Cambios propuestos

### 1. Crear helper de Lovable AI Gateway
Nuevo archivo `src/lib/ai-gateway.ts` con:
- `createLovableAiGatewayRunIdFetch` (captura/reenvía `X-Lovable-AIG-Run-ID`).
- `createLovableAiGatewayProvider` (proveedor con `createOpenAI`, baseURL del gateway y headers requeridos).
- Helpers de headers: `getLovableAiGatewayRunId`, `getLovableAiGatewayResponseHeaders`, `withLovableAiGatewayRunIdHeader`.

### 2. Reescribir `chatWithAgent` en `src/lib/laia-agent.functions.ts`
- Leer `LOVABLE_API_KEY` en lugar de `OPENAI_API_KEY`.
- Usar el proveedor del gateway con el modelo Responses `openai/gpt-4o-mini`.
- Cambiar de `generateText` a `streamText` consumida server-side (`await result.output`) para evitar timeouts en llamadas al gateway.
- Mantener salida estructurada con `Output.object({ schema })`.
- Agregar `providerOptions.openai.store: false` por ser multi-turn stateless.
- Omitir opciones de reasoning porque `gpt-4o-mini` no es modelo de reasoning.
- Proteger contra `NoObjectGeneratedError` con fallback graceful.
- Devolver `Response.json` que propague los headers `X-Lovable-AIG-*` al navegador.

### 3. Ajustar schema de salida del modelo (si es necesario)
Si el schema actual con `.max()` en cada campo genera rechazo por strict-mode en Responses API, mover los límites de longitud al prompt y dejar el schema plano y strict-compatible, validando/clampeando el resultado después.

### 4. Preservar `OPENAI_API_KEY`
No eliminar el secreto; solo dejar de usarlo en el código para que el switch de regreso a OpenAI sea inmediato cuando el usuario lo pida.

### 5. Verificación end-to-end
- Abrir el widget de chat en el preview.
- Enviar un mensaje de prueba y confirmar que el agente responde.
- Completar el flujo hasta que el agente marque `status: "done"`.
- Confirmar en la base de datos que el lead se guardó en `laia_leads`.

## Entregable
Agente Diagnóstico LAIA funcionando con Lovable AI Gateway, sin depender de la cuenta de OpenAI del usuario.
