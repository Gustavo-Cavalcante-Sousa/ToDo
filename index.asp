<%
Dim conn
Set conn = Server.CreateObject("ADODB.Connection")
conn.Open "DRIVER={MySQL ODBC 8.0 Unicode Driver};SERVER=localhost;DATABASE=todolist;USER=root;PASSWORD=;"
%>

<%
Response.ContentType = "text/html"
%>
<html>
<head>
    <title>Lista de Tarefas</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-6">
    <div class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-center text-blue-600">Gerenciador de Tarefas</h1>
        <a href="form.asp" class="block text-center my-4 p-2 bg-blue-500 text-white rounded">Adicionar Nova Tarefa</a>
        <table class="w-full border-collapse bg-gray-50 mt-4">
            <tr class="bg-gray-200">
                <th class="p-2 border">ID</th>
                <th class="p-2 border">Título</th>
                <th class="p-2 border">Descrição</th>
                <th class="p-2 border">Ações</th>
            </tr>
            <%
            Set rs = conn.Execute("SELECT * FROM tarefas")
            Do While Not rs.EOF
            %>
            <tr class="text-center">
                <td class="p-2 border"><%= rs("id") %></td>
                <td class="p-2 border"><%= rs("titulo") %></td>
                <td class="p-2 border"><%= rs("descricao") %></td>
                <td class="p-2 border">
                    <a href="form.asp?id=<%= rs("id") %>" class="px-3 py-1 bg-yellow-500 text-white rounded">Editar</a>
                    <a href="delete.asp?id=<%= rs("id") %>" class="px-3 py-1 bg-red-500 text-white rounded">Excluir</a>
                </td>
            </tr>
            <%
            rs.MoveNext
            Loop
            rs.Close
            %>
        </table>
    </div>
</body>
</html>
