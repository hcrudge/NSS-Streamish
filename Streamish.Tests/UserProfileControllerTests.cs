using Streamish.Controllers;
using Streamish.Models;
using Streamish.Tests.Mocks;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace Streamish.Tests
{
    public class UserProfileControllerTests
    {
        [Fact]
        public void Get_Returns_All_User_Profiles()
        {
            // Arrange - a.k.a. Test Bed
            var userCount = 10;
            var userProfiles = CreateTestUserProfiles(userCount);

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            // Act 
            var result = controller.Get();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualProfiles = Assert.IsType<List<UserProfile>>(okResult.Value);

            Assert.Equal(userCount, actualProfiles.Count);
            Assert.Equal(userProfiles, actualProfiles);
        }

        [Fact]
        public void Get_By_Id_Returns_NotFound_When_Given_Unknown_id()
        {
            // Arrange 
            var userProfiles = new List<UserProfile>(); // no userProfiles

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            // Act
            var result = controller.Get(1);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Get_By_Id_Returns_UserProfile_With_Given_Id()
        {
            // Arrange
            var testUserProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testUserProfileId; // Make sure we know the Id of one of the userProfiles

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            // Act
            var result = controller.Get(testUserProfileId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualProfile = Assert.IsType<UserProfile>(okResult.Value);

            Assert.Equal(testUserProfileId, actualProfile.Id);
        }

        [Fact]
        public void Post_Method_Adds_A_New_UserProfile()
        {
            // Arrange 
            var profileCount = 10;
            var userProfiles = CreateTestUserProfiles(profileCount);

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            // Act
            var newUserProfile = new UserProfile()
            {
                Name = "Name",
                Email = "Email",
                ImageUrl = "http://youtube.url?v=1234",
                DateCreated = DateTime.Today,
            
            };

            controller.Post(newUserProfile);

            // Assert
            Assert.Equal(profileCount + 1, repo.InternalData.Count);
        }

        [Fact]
        public void Put_Method_Returns_BadRequest_When_Ids_Do_Not_Match()
        {
            // Arrange
            var testProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testProfileId; // Make sure we know the Id of one of the videos

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var profileToUpdate = new UserProfile()
            {
                Id = testProfileId,
                Name = "Updated!",
                Email = "Updated!",
                DateCreated = DateTime.Today,
                ImageUrl = "http://some.url",
            };
            var someOtherProfileId = testProfileId + 1; // make sure they aren't the same

            // Act
            var result = controller.Put(someOtherProfileId, profileToUpdate);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void Put_Method_Updates_A_UserProfile()
        {
            // Arrange
            var testProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testProfileId; // Make sure we know the Id of one of the videos

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            var profileToUpdate = new UserProfile()
            {
                Id = testProfileId,
                Name = "Updated!",
                Email = "Updated!",
                DateCreated = DateTime.Today,
                ImageUrl = "http://some.url",
            };

            // Act
            controller.Put(testProfileId, profileToUpdate);

            // Assert
            var userProfileFromDb = repo.InternalData.FirstOrDefault(p => p.Id == testProfileId);
            Assert.NotNull(userProfileFromDb);

            Assert.Equal(profileToUpdate.Name, userProfileFromDb.Name);
            Assert.Equal(profileToUpdate.Email, userProfileFromDb.Email);
            Assert.Equal(profileToUpdate.DateCreated, userProfileFromDb.DateCreated);
            Assert.Equal(profileToUpdate.ImageUrl, userProfileFromDb.ImageUrl);
        }

        [Fact]
        public void Delete_Method_Removes_A_UserProfile()
        {
            // Arrange
            var testProfileId = 99;
            var userProfiles = CreateTestUserProfiles(5);
            userProfiles[0].Id = testProfileId; // Make sure we know the Id of one of the videos

            var repo = new InMemoryUserProfileRepository(userProfiles);
            var controller = new UserProfileController(repo);

            // Act
            controller.Delete(testProfileId);

            // Assert
            var profileFromDb = repo.InternalData.FirstOrDefault(p => p.Id == testProfileId);
            Assert.Null(profileFromDb);
        }

        private List<Video> CreateTestVideo(int count)
        {
            var videos = new List<Video>();
            for (var i = 1; i <= count; i++)
            {
                videos.Add(new Video()
                {
                    Id = i,
                    Description = $"Description {i}",
                    Title = $"Title {i}",
                    Url = $"http://youtube.url/{i}?v=1234",
                    DateCreated = DateTime.Today.AddDays(-i),
                    UserProfileId = i,
                    UserProfile = CreateTestUserProfile(i),
                });
            }
            return videos;
        }

        private List<UserProfile> CreateTestUserProfiles(int count)
        {
            var userProfiles = new List<UserProfile>();
            for (var i = 1; i <= count; i++)
            {
                userProfiles.Add(new UserProfile()
                {
                    Id = i,
                    Name = $"User {i}",
                    Email = $"user{i}@example.com",
                    ImageUrl = $"http://youtube.url/{i}?v=1234",
                    DateCreated = DateTime.Today.AddDays(-i),
                });
            }
            return userProfiles;
        }

        private UserProfile CreateTestUserProfile(int id)
        {
            return new UserProfile()
            {
                Id = id,
                Name = $"User {id}",
                Email = $"user{id}@example.com",
                DateCreated = DateTime.Today.AddDays(-id),
                ImageUrl = $"http://user.url/{id}",
            };
        }
    }
}
