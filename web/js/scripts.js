window.addEventListener("DOMContentLoaded", (event) => {
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector("#navbar");
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove("navbar-shrink");
        } else {
            navbarCollapsible.classList.add("navbar-shrink");
        }
    };

    navbarShrink();

    document.addEventListener("scroll", navbarShrink);

    const navbar = document.body.querySelector("#navbar");
    if (navbar) {
        new bootstrap.ScrollSpy(document.body, {
            target: "#navbar",
            rootMargin: "0px 0px -40%",
        });
    }

    const navbarToggler = document.body.querySelector(".navbar-menu");
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll("#navbarResponsive .navbar-link")
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener("click", () => {
            if (window.getComputedStyle(navbarToggler).display !== "none") {
                navbarToggler.click();
            }

            // Redirect to the login page
            window.location.href = "login.html";
        });
    });

    function togglePopup() {
        var popup = document.getElementById("game-popup1");
        popup.classList.toggle("show");
    }

    var gameLinks = document.querySelectorAll(".game-link");
    gameLinks.forEach(function (gameLink) {
        gameLink.addEventListener("click", function (event) {
            event.preventDefault();
            togglePopup();
        });
    });
});
