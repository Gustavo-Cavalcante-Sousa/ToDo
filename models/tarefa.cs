using System;
using System.ComponentModel.DataAnnotations;

public class Tarefa
{
    [Key]
    public int Id {get; set;}

    [Required]
    public string Titulo {get;set;}

    public string Descricao {get;set;}

    public DateTime? DataConclusao {get;set;}
}
