using System;
using Xunit;

namespace <%= name %>.Core.IntegrationTests
{
    public class IntegrationTest1
    {
        public UnitTest1()
        {
            var configuration = ConfigurationFactory.BuildConfiguration();
            // Access the Secret with configuration["Secret]
        }

        [Fact]
        public void Test1()
        {
        }
    }
}
