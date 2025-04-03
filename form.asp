<% Dim conn, id, titulo, descricao Set conn =
Server.CreateObject("ADODB.Connection") conn.Open "DRIVER={MySQL ODBC 8.0
Unicode Driver};SERVER=localhost;DATABASE=todolist;USER=root;PASSWORD=;" id =
Request.QueryString("id") If id <> "" Then Set rs = conn.Execute("SELECT * FROM
tarefas WHERE id=" & id) If Not rs.EOF Then titulo = rs("titulo") descricao =
rs("descricao") End If rs.Close End If %>

<html>
  <head>
    <title><%= IIf(id<>"", "Editar", "Criar") %> Tarefa</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="bg-gray-100 p-6">
    <div class="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center text-blue-600">
        <%= IIf(id<>"", "Editar", "Criar") %> Tarefa
      </h1>
      <form method="post" action="save.asp" class="mt-4">
        <input type="hidden" name="id" value="<%= id %>" />
        <label class="block mb-2">Título:</label>
        <input
          type="text"
          name="titulo"
          value="<%= titulo %>"
          required
          class="w-full p-2 border rounded mb-4"
        />
        <label class="block mb-2">Descrição:</label>
        <textarea
          name="descricao"
          required
          class="w-full p-2 border rounded mb-4"
        >
<%= descricao %></textarea
        >
        <button
          type="submit"
          class="w-full bg-green-500 text-white p-2 rounded"
        >
          Salvar
        </button>
      </form>
    </div>
  </body>
</html>
