<% Dim conn, id Set conn = Server.CreateObject("ADODB.Connection") conn.Open
"DRIVER={MySQL ODBC 8.0 Unicode
Driver};SERVER=localhost;DATABASE=todolist;USER=root;PASSWORD=;" id =
Request.QueryString("id") If id <> "" Then conn.Execute "DELETE FROM tarefas
WHERE id=" & id End If Response.Redirect "index.asp" %>
