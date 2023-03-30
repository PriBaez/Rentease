using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SDGAV.Models
{
    public partial class SDGAVContext : DbContext
    {
        public SDGAVContext()
        {
        }

        public SDGAVContext(DbContextOptions<SDGAVContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<CommentReply> CommentReplies { get; set; } = null!;
        public virtual DbSet<Module> Modules { get; set; } = null!;
        public virtual DbSet<Operacione> Operaciones { get; set; } = null!;
        public virtual DbSet<Property> Propertys { get; set; } = null!;
        public virtual DbSet<PropertyImage> PropertyImages { get; set; } = null!;
        public virtual DbSet<Rol> Rols { get; set; } = null!;
        public virtual DbSet<RolOperation> RolOperations { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserRating> UserRatings { get; set; } = null!;
        public virtual DbSet<UserSafe> UserSaves { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost;Database=SDGAV;User=sa;Password=Sql.1234;Trusted_Connection=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("comments");

                entity.Property(e => e.CommentId).HasColumnName("commentID");

                entity.Property(e => e.Comment1)
                    .HasMaxLength(5000)
                    .IsUnicode(false)
                    .HasColumnName("comment");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");

                entity.Property(e => e.PropertyId).HasColumnName("propertyID");

                entity.HasOne(d => d.Property)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.PropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CommentsPropertys");
            });

            modelBuilder.Entity<CommentReply>(entity =>
            {
                entity.HasKey(e => e.ReplyId)
                    .HasName("PK__commentR__36BBF6A8E49E3568");

                entity.ToTable("commentReply");

                entity.Property(e => e.ReplyId).HasColumnName("replyID");

                entity.Property(e => e.Comment)
                    .HasMaxLength(5000)
                    .IsUnicode(false)
                    .HasColumnName("comment");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");

                entity.Property(e => e.ParentCommentId).HasColumnName("parent_comment_id");

                entity.HasOne(d => d.ParentComment)
                    .WithMany(p => p.CommentReplies)
                    .HasForeignKey(d => d.ParentCommentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_replyToParent");
            });

            modelBuilder.Entity<Module>(entity =>
            {
                entity.ToTable("module");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Operacione>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Idmodulo).HasColumnName("IDmodulo");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.HasOne(d => d.IdmoduloNavigation)
                    .WithMany(p => p.Operaciones)
                    .HasForeignKey(d => d.Idmodulo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OperacionesModule");
            });

            modelBuilder.Entity<Property>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.AreaTotal).HasColumnName("area_total");

                entity.Property(e => e.Bedrooms).HasColumnName("bedrooms");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(5000)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");

                entity.Property(e => e.ExpectedPrice).HasColumnName("expected_price");

                entity.Property(e => e.Garage).HasColumnName("garage");

                entity.Property(e => e.Garden).HasColumnName("garden");

                entity.Property(e => e.SalespersonId).HasColumnName("salespersonID");

                entity.Property(e => e.Titulo)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("titulo");

                entity.HasOne(d => d.Salesperson)
                    .WithMany(p => p.Properties)
                    .HasForeignKey(d => d.SalespersonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_salespersonUser");
            });

            modelBuilder.Entity<PropertyImage>(entity =>
            {
                entity.HasKey(e => e.IdImage)
                    .HasName("PK__property__FAC72AB74868FD0B");

                entity.ToTable("property_images");

                entity.Property(e => e.IdImage).HasColumnName("ID_image");

                entity.Property(e => e.Image).HasColumnName("image");

                entity.Property(e => e.PropertyId).HasColumnName("propertyID");

                entity.Property(e => e.UploadAt)
                    .HasColumnType("datetime")
                    .HasColumnName("upload_at")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Property)
                    .WithMany(p => p.PropertyImages)
                    .HasForeignKey(d => d.PropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_imagesProperty");
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.ToTable("Rol");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<RolOperation>(entity =>
            {
                entity.ToTable("Rol_operation");

                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Rol).HasColumnName("rol");

                entity.HasOne(d => d.OperacionNavigation)
                    .WithMany(p => p.RolOperations)
                    .HasForeignKey(d => d.Operacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RolOp_Operaciones");

                entity.HasOne(d => d.RolNavigation)
                    .WithMany(p => p.RolOperations)
                    .HasForeignKey(d => d.Rol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RolOp_Rol");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.PasswordHash).HasColumnName("password_hash");

                entity.Property(e => e.PasswordSalt).HasColumnName("password_salt");

                entity.Property(e => e.Phone)
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.Rol).HasColumnName("rol");

                entity.Property(e => e.Username)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("username");

                entity.HasOne(d => d.RolNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Rol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UsersRol");
            });

            modelBuilder.Entity<UserRating>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("UserRating");

                entity.Property(e => e.RatingFrom).HasColumnName("rating_from");

                entity.Property(e => e.RatingTo).HasColumnName("rating_to");

                entity.Property(e => e.Score).HasColumnName("score");

                entity.HasOne(d => d.RatingFromNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.RatingFrom)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RatingFromUsers");

                entity.HasOne(d => d.RatingToNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.RatingTo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RatingToUsers");
            });

            modelBuilder.Entity<UserSafe>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasColumnName("create_at");

                entity.Property(e => e.PropertyId).HasColumnName("propertyID");

                entity.Property(e => e.UserId).HasColumnName("userID");

                entity.HasOne(d => d.Property)
                    .WithMany(p => p.UserSaves)
                    .HasForeignKey(d => d.PropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SavesPropertys");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserSaves)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SavesUsers");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
