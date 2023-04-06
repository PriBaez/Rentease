using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SDGAV.Models
{
    public partial class sdgav_2Context : DbContext
    {
        public sdgav_2Context()
        {
        }

        public sdgav_2Context(DbContextOptions<sdgav_2Context> options)
            : base(options)
        {
        }

        public virtual DbSet<Attribute> Attributes { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<Operation> Operations { get; set; } = null!;
        public virtual DbSet<PropertiesAttribute> PropertiesAttributes { get; set; } = null!;
        public virtual DbSet<PropertiesImage> PropertiesImages { get; set; } = null!;
        public virtual DbSet<Property> Properties { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<RolesOperation> RolesOperations { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UsersFavorite> UsersFavorites { get; set; } = null!;
        public virtual DbSet<UsersRating> UsersRatings { get; set; } = null!;
        public virtual DbSet<UsersSafe> UsersSaves { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=localhost;Database=sdgav_2;User=SA;Password=Sql.1234;Trusted_Connection=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Attribute>(entity =>
            {
                entity.ToTable("attributes");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.Status).HasColumnName("status");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("comments");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Comment1)
                    .IsUnicode(false)
                    .HasColumnName("comment");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");

                entity.Property(e => e.PropertyId).HasColumnName("property_id");

                entity.Property(e => e.RelatedComment).HasColumnName("related_comment");

                entity.Property(e => e.Score).HasColumnName("score");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Property)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.PropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_comments_properties");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_comments_users");
            });

            modelBuilder.Entity<Operation>(entity =>
            {
                entity.ToTable("operations");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<PropertiesAttribute>(entity =>
            {
                entity.ToTable("properties_attributes");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdAttribute).HasColumnName("id_attribute");

                entity.Property(e => e.PropertyId).HasColumnName("property_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.IdAttributeNavigation)
                    .WithMany(p => p.PropertiesAttributes)
                    .HasForeignKey(d => d.IdAttribute)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_attributes_propertiesAttributes");

                entity.HasOne(d => d.Property)
                    .WithMany(p => p.PropertiesAttributes)
                    .HasForeignKey(d => d.PropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_propertiesAtrributes_Properties");
            });

            modelBuilder.Entity<PropertiesImage>(entity =>
            {
                entity.ToTable("properties_images");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Image).HasColumnName("image");

                entity.Property(e => e.PropertyId).HasColumnName("property_id");

                entity.Property(e => e.UploadAt)
                    .HasColumnType("datetime")
                    .HasColumnName("upload_at")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Property)
                    .WithMany(p => p.PropertiesImages)
                    .HasForeignKey(d => d.PropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_propertiesImage_Properties");
            });

            modelBuilder.Entity<Property>(entity =>
            {
                entity.ToTable("properties");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AreaTotal).HasColumnName("area_total");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.SellerId).HasColumnName("seller_id");

                entity.Property(e => e.Titulo)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("titulo");

                entity.HasOne(d => d.Seller)
                    .WithMany(p => p.Properties)
                    .HasForeignKey(d => d.SellerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_seller_id");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<RolesOperation>(entity =>
            {
                entity.ToTable("roles_operations");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.OperationId).HasColumnName("operation_id");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.HasOne(d => d.Operation)
                    .WithMany(p => p.RolesOperations)
                    .HasForeignKey(d => d.OperationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_roles_operations_operations");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RolesOperations)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_roles_operations_roles");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .HasMaxLength(80)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Phone)
                    .HasMaxLength(11)
                    .IsUnicode(false)
                    .HasColumnName("phone");

                entity.Property(e => e.Pwd)
                    .IsUnicode(false)
                    .HasColumnName("pwd");

                entity.Property(e => e.Role).HasColumnName("role");

                entity.HasOne(d => d.RoleNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Role)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_users_roles");
            });

            modelBuilder.Entity<UsersFavorite>(entity =>
            {
                entity.ToTable("users_favorites");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasColumnName("create_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.PropertyId).HasColumnName("property_id");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Property)
                    .WithMany(p => p.UsersFavorites)
                    .HasForeignKey(d => d.PropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_users_favorites_properties");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UsersFavorites)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_users_favorites_users");
            });

            modelBuilder.Entity<UsersRating>(entity =>
            {
                entity.ToTable("users_rating");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Comment)
                    .IsUnicode(false)
                    .HasColumnName("comment");

                entity.Property(e => e.RatingFrom).HasColumnName("rating_from");

                entity.Property(e => e.RatingTo).HasColumnName("rating_to");

                entity.Property(e => e.Score).HasColumnName("score");

                entity.HasOne(d => d.RatingFromNavigation)
                    .WithMany(p => p.UsersRatingRatingFromNavigations)
                    .HasForeignKey(d => d.RatingFrom)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_rating_from_users");

                entity.HasOne(d => d.RatingToNavigation)
                    .WithMany(p => p.UsersRatingRatingToNavigations)
                    .HasForeignKey(d => d.RatingTo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_rating_to_users");
            });

            modelBuilder.Entity<UsersSafe>(entity =>
            {
                entity.ToTable("users_saves");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreateAt)
                    .HasColumnType("datetime")
                    .HasColumnName("create_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.PropertyId).HasColumnName("property_id");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Property)
                    .WithMany(p => p.UsersSaves)
                    .HasForeignKey(d => d.PropertyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_users_saves_properties");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UsersSaves)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_users_saves_users");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
