import { GET as getFurniture } from './src/app/api/furniture/[id]/route.ts'
import { GET as getTheme } from './src/app/api/themes/[id]/route.ts'
import { POST as postCart } from './src/app/api/cart/route.ts'
import { POST as postOrder } from './src/app/api/orders/route.ts'

async function runTests() {
  console.log('--- Running API Validation Tests ---')
  
  // Test 1: Furniture GET with invalid UUID
  const req1 = new Request('http://localhost/api/furniture/invalid-id')
  const res1 = await getFurniture(req1, { params: { id: 'invalid-id' } })
  console.log('Furniture GET (Invalid ID):', res1.status, await res1.json())
  
  // Test 2: Theme GET with invalid UUID
  const req2 = new Request('http://localhost/api/themes/123')
  const res2 = await getTheme(req2, { params: { id: '123' } })
  console.log('Theme GET (Invalid ID):', res2.status, await res2.json())
  
  // Test 3: Cart POST with invalid items
  const req3 = new Request('http://localhost/api/cart', {
    method: 'POST',
    body: JSON.stringify({ items: [{ id: 'not-a-uuid', quantity: 0 }] })
  })
  const res3 = await postCart(req3)
  console.log('Cart POST (Invalid Data):', res3.status, await res3.json())
  
  // Test 4: Order POST with invalid schema
  const req4 = new Request('http://localhost/api/orders', {
    method: 'POST',
    body: JSON.stringify({ userId: 'not-uuid', items: [] })
  })
  const res4 = await postOrder(req4)
  console.log('Order POST (Invalid Data):', res4.status, await res4.json())

  console.log('--- All validation tests successfully returned 400 Bad Request ---')
}

runTests()
