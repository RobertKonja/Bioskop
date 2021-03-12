namespace Bioskop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Films",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Naziv = c.String(nullable: false, maxLength: 40),
                        Reziser = c.String(),
                        Glumci = c.String(),
                        Zanr = c.String(),
                        Trajanje = c.Int(nullable: false),
                        Distributer = c.String(),
                        Zemlja = c.String(),
                        GodinaProizvodnje = c.Int(nullable: false),
                        Opis = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Kartas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DatumProdaje = c.DateTime(nullable: false),
                        KorisnikId = c.Int(nullable: false),
                        ProjekcijaId = c.Int(nullable: false),
                        SedisteId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Korisniks", t => t.KorisnikId, cascadeDelete: true)
                .ForeignKey("dbo.Projekcijas", t => t.ProjekcijaId, cascadeDelete: true)
                .ForeignKey("dbo.Sedistes", t => t.SedisteId, cascadeDelete: true)
                .Index(t => t.KorisnikId)
                .Index(t => t.ProjekcijaId)
                .Index(t => t.SedisteId);
            
            CreateTable(
                "dbo.Korisniks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        KorisnickoIme = c.String(),
                        Lozinka = c.String(),
                        DatumRegistracije = c.DateTime(nullable: false),
                        Uloga = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Projekcijas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DatumVreme = c.DateTime(nullable: false),
                        CenaKarte = c.Double(nullable: false),
                        Administrator = c.String(),
                        FilmId = c.Int(nullable: false),
                        TipId = c.Int(nullable: false),
                        SalaId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Films", t => t.FilmId, cascadeDelete: true)
                .ForeignKey("dbo.Salas", t => t.SalaId, cascadeDelete: true)
                .ForeignKey("dbo.TipProjekcijes", t => t.TipId, cascadeDelete: true)
                .Index(t => t.FilmId)
                .Index(t => t.TipId)
                .Index(t => t.SalaId);
            
            CreateTable(
                "dbo.Salas",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Naziv = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TipProjekcijes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Naziv = c.String(),
                        Sala_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Salas", t => t.Sala_Id)
                .Index(t => t.Sala_Id);
            
            CreateTable(
                "dbo.Sedistes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RedniBroj = c.String(),
                        SalaId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Salas", t => t.SalaId, cascadeDelete: false)
                .Index(t => t.SalaId);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.SalaTips",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SalaId = c.Int(nullable: false),
                        TipProjekcijeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Salas", t => t.SalaId, cascadeDelete: true)
                .ForeignKey("dbo.TipProjekcijes", t => t.TipProjekcijeId, cascadeDelete: true)
                .Index(t => t.SalaId)
                .Index(t => t.TipProjekcijeId);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.SalaTips", "TipProjekcijeId", "dbo.TipProjekcijes");
            DropForeignKey("dbo.SalaTips", "SalaId", "dbo.Salas");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.Kartas", "SedisteId", "dbo.Sedistes");
            DropForeignKey("dbo.Sedistes", "SalaId", "dbo.Salas");
            DropForeignKey("dbo.Kartas", "ProjekcijaId", "dbo.Projekcijas");
            DropForeignKey("dbo.Projekcijas", "TipId", "dbo.TipProjekcijes");
            DropForeignKey("dbo.Projekcijas", "SalaId", "dbo.Salas");
            DropForeignKey("dbo.TipProjekcijes", "Sala_Id", "dbo.Salas");
            DropForeignKey("dbo.Projekcijas", "FilmId", "dbo.Films");
            DropForeignKey("dbo.Kartas", "KorisnikId", "dbo.Korisniks");
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.SalaTips", new[] { "TipProjekcijeId" });
            DropIndex("dbo.SalaTips", new[] { "SalaId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.Sedistes", new[] { "SalaId" });
            DropIndex("dbo.TipProjekcijes", new[] { "Sala_Id" });
            DropIndex("dbo.Projekcijas", new[] { "SalaId" });
            DropIndex("dbo.Projekcijas", new[] { "TipId" });
            DropIndex("dbo.Projekcijas", new[] { "FilmId" });
            DropIndex("dbo.Kartas", new[] { "SedisteId" });
            DropIndex("dbo.Kartas", new[] { "ProjekcijaId" });
            DropIndex("dbo.Kartas", new[] { "KorisnikId" });
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.SalaTips");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.Sedistes");
            DropTable("dbo.TipProjekcijes");
            DropTable("dbo.Salas");
            DropTable("dbo.Projekcijas");
            DropTable("dbo.Korisniks");
            DropTable("dbo.Kartas");
            DropTable("dbo.Films");
        }
    }
}
