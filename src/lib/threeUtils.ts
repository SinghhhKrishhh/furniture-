import * as THREE from 'three'

/**
 * Computes the current bounding box of a 3D object and applies a uniform scale 
 * so its physical dimensions match the target dimensions (in meters).
 * 
 * @param object3D The loaded Three.js Object3D/Group
 * @param targetDimensions The desired size { length, width, height }
 */
export function scaleToBoundingBox(
  object3D: THREE.Object3D, 
  targetDimensions: { length: number, width: number, height: number }
) {
  // Compute current bounding box
  const box = new THREE.Box3().setFromObject(object3D)
  const size = new THREE.Vector3()
  box.getSize(size)

  // Calculate scale factors for each axis (assuming Y is up, X is width, Z is length)
  // To avoid stretching, we usually apply a uniform scale based on the dominant axis, 
  // or we can apply non-uniform scale if strictly requested.
  // Here we apply uniform scaling to fit the maximum dimension constraint.
  
  const scaleX = targetDimensions.width / size.x
  const scaleY = targetDimensions.height / size.y
  const scaleZ = targetDimensions.length / size.z

  // Use the average or max scale depending on design needs. For strict adherence, non-uniform:
  object3D.scale.set(scaleX, scaleY, scaleZ)
  
  // Optionally recenter the object based on its new scaled bounding box
  object3D.updateMatrixWorld()
}
