import { test, expect } from '@playwright/test';

test('Home page has basic functionality', async ({ page }) => {
  await page.goto('http://localhost:1234/');

  // Title
  await expect(page).toHaveTitle(/Docspider/);

  // Modal "Sobre"
  const about = page.getByText("Sobre");
  await about.click();
  const modal = page.getByTestId("about");
  await expect(modal).toBeVisible();
  await modal.getByText("Fechar").click();
 
  // Ir para a página de "Meus Documentos"
  await page.getByText("Meus Documentos").click();

  // Criar documento sem arquivo
  const novo = page.getByTestId("new-document");
  await novo.click();
  await page.locator('[for="title"] + input').fill("Um título legal!");
  await page.locator('[for="description"] + textarea').fill("Uma descrição da hora");
  await page.getByText("Criar Documento").click();

  // Verificar que documento foi criado
  const myDocuments = page.getByTestId("my-documents");
  await expect(myDocuments).toBeVisible();
  await expect(myDocuments.locator('tbody tr:last-child')).toContainText("Um título legal!");
  await myDocuments.locator('tbody tr:last-child').getByTestId("destroy-document").click();

  // Destruição de documento
  await page.getByText("Deletar").click();
  await expect(myDocuments.locator('tbody tr:last-child')).not.toContainText("Um título legal!");
});
