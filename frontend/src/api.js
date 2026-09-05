export const api = async (path, options) => {
  const response = await fetch(path, options)
  if (!response.ok) throw new Error(await response.text())
  return response.json()
}
