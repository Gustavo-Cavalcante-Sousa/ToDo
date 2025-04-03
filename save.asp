<% Dim conn, id, titulo, descricao Set conn =
Server.CreateObject("ADODB.Connection") conn.Open "DRIVER={MySQL ODBC 8.0
Unicode Driver};SERVER=localhost;DATABASE=todolist;USER=root;PASSWORD=;" id =
Request.Form("id") titulo = Request.Form("titulo") descricao =
Request.Form("descricao") If id = "" Then conn.Execute "INSERT INTO tarefas
(titulo, descricao) VALUES ('" & titulo & "', '" & descricao & "')" Else
conn.Execute "UPDATE tarefas SET titulo='" & titulo & "', descricao='" &
descricao & "' WHERE id=" & id End If Response.Redirect "index.asp" %>
