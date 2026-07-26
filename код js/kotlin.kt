import org.kohsuke.github.GitHubBuilder

fun main() {
    // 1. Авторизация в GitHub по вашему токену
    val github = GitHubBuilder().withOAuthToken("ghp_RLYFTz2PeTdiJ9ji3A1VObXHeq7vTq1fQ3iY").build()

    // 2. Получение доступа к конкретному репозиторию (замените 'имя_репозитория' на ваше)
    val repo = github.getRepository("voloda06346/melonsandbox3dclone.com")

    // 3. Чтение текущего содержания файла index.html из ветки "main"
    val fileContent = repo.getFileContent("index.html", "main")
    val currentHtml = fileContent.content 
    println("Текущий HTML-код на GitHub:\n$currentHtml")

    // 4. Создаем новый измененный HTML-код
    val updatedHtml = """
        <!DOCTYPE html>
        <html>
        <head><title>Обновлено из Kotlin</title></head>
        <body><h1>Этот файл был автоматически изменен кодом на Kotlin!</h1></body>
        </html>
    """.trimIndent()

    // 5. Отправка (Commit) обновленного файла обратно в GitHub
    fileContent.update(updatedHtml, "Автоматическое обновление index.html из Kotlin кода", "main")
    println("Файл index.html успешно обновлен на GitHub!")
}

