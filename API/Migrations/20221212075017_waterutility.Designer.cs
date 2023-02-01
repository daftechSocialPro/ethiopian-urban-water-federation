﻿// <auto-generated />
using System;
using DAFwebAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DAFwebAPI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20221212075017_waterutility")]
    partial class waterutility
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("DAFwebAPI.Entities.BoardMember", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("BirthDate")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("InActiveDescription")
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Position")
                        .HasColumnType("text");

                    b.Property<string>("UserPhoto")
                        .HasColumnType("text");

                    b.Property<Guid>("WaterFederationId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("createdBy")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.HasIndex("WaterFederationId");

                    b.ToTable("BoardMembers");
                });

            modelBuilder.Entity("DAFwebAPI.Entities.Contact", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Message")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Subject")
                        .HasColumnType("text");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("createdBy")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("DAFwebAPI.Entities.News", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Img")
                        .HasColumnType("text");

                    b.Property<string>("SubTitle")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<Guid>("WaterFederationId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("createdBy")
                        .HasColumnType("uuid");

                    b.Property<bool>("isApproved")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.HasIndex("WaterFederationId");

                    b.ToTable("News");
                });

            modelBuilder.Entity("DAFwebAPI.Entities.Research", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AmharicAuthor")
                        .HasColumnType("text");

                    b.Property<string>("AmharicDescription")
                        .HasColumnType("text");

                    b.Property<string>("AmharicTitle")
                        .HasColumnType("text");

                    b.Property<string>("Author")
                        .HasColumnType("text");

                    b.Property<string>("AuthorImagePath")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime>("PublishedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("ResearchFilePath")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("createdBy")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("Researchs");
                });

            modelBuilder.Entity("DAFwebAPI.Entities.User", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("UserType")
                        .HasColumnType("integer");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("createdBy")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DAFwebAPI.Entities.Vaccancy", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AmharicDescription")
                        .HasColumnType("text");

                    b.Property<string>("AmharicTitle")
                        .HasColumnType("text");

                    b.Property<string>("Company")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FilePath")
                        .HasColumnType("text");

                    b.Property<DateTime>("FromDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<DateTime>("ToDateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("createdBy")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("ID");

                    b.ToTable("Vaccancies");
                });

            modelBuilder.Entity("DAFwebAPI.Entities.BoardMember", b =>
                {
                    b.HasOne("DAFwebAPI.Entities.User", "WaterFederation")
                        .WithMany()
                        .HasForeignKey("WaterFederationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WaterFederation");
                });

            modelBuilder.Entity("DAFwebAPI.Entities.News", b =>
                {
                    b.HasOne("DAFwebAPI.Entities.User", "WaterFederation")
                        .WithMany()
                        .HasForeignKey("WaterFederationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WaterFederation");
                });
#pragma warning restore 612, 618
        }
    }
}
