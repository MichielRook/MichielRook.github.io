$(document).ready(function() {
	if ($(".text").height() > 374) {
		$(".text").css("overflow-y", "scroll");
		$(".text").css("height", "374px");
	}
	
	$("#heightButton").mouseover(function() {
		$("#popup").show();
	});
	
	$("#heightButton").mouseout(function() {
		$("#popup").hide();
	});
});

function changeHeight() {
	var video = document.getElementById("courseVideo");
	var button = document.getElementById("heightButton");
	var popup = document.getElementById("popup");
	var textdiv = document.querySelector(".textdiv");
	
	if (video.className == "expanded") {
		video.style.height = "0px";
		video.className = "collapsed";
		video.removeAttribute("controls");
		button.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAESUlEQVR4Xu2ZjbENQRCFz4uADBABIkAEiAARIAJEgAgQASJABJ4IEAEioD61/Wpe35np2Z+7Vu101dZVdne6+8w53b3zTrRzO9l5/uoAdAbsHIEugZ0ToBfBLoEugZ0j0CWwcwL0LtAl0CWwDgI3JN2UdHm4Lkq65lyfSvop6dtwfZT06djhHUsCJHpb0p0h8Tl5AMQ7Se8HYOasdfDu0gDck3R/gaRLSQLGa0lvlkJhCQCg88MhcXZ+DUMmAPFykM1kn3MBeCLpkSRAqNl3SewegfOL2a+9R43ArFbweylYl5qB/8mMmAoAwb0aClopxi/DLqFfEp9iMIo6gqyuVhZg/QcZUEOfYwFgp0mcoHL2ayhYLyRR1Zc0uga7TZ0pGWADBMxosjEAkDTJ1+gOFdmtYxrar4FA8oAAGKG1AvB8QD9a8Eoj3a1o2iwAW2BNi5aRxdcokGG9x9FzEQDs9ofM0JJbF8374cY/F60HELcaKMxztZpgfsP1agCQDMnnKE/7sWHHnIE2u1izzw0gEfT1YJ2nkuhAZjYkwSxvSAJQszWpBAA6hvY+eYoc99AXbYwR1wwnvrWlwVDAWLPF0DBaLxldiM0xY2Tm/6hTvHfBvVisCzkASJBi5w2K48Ba2m/3QCSnlt23JSMWsDE/Cv5hJhuUk8gBsD7oUvJQjHtpexkLgH8+YkIEaM0/AMEEvke8nQMhdVJKvtTatgyAJV1qmWcgGAAUPCjqrdbXYUOqtagFtlZuYog6io+X2lSaT0ogUGhPDQBfVFIEQStnWyyCuTipZ7nh7BwAvFiSAAjmQPDIPpNEe6pZCwui3Wd93wZLTC0lfyABC7oGAn0+LYK+rUWVGx/QFOaUhhiSh43RLO87iq/u+KHl5na+WAQjEPxUlRtJozqQ+gBAA4LEGaJqvd/ejfxy/21h4ArboDmpDRR33Td9Ogz9i48hG4KIHfaQfG2AOyfRaBSGrn6qMg2i+Zxk/haXqMlPvJ/rVrarjMa5GkSHAJhRo7DFV9MsC9r8n2qaSREQIh2PxYBY0H567IZ0rBblPsTCmhJNWxYk+sx9aHAfILxzRlGksqRBbX8Qk/NtPvlgA5yqtQJg+qJIRed05jD8FI2CG+5Hn9B+Gc4fkWbtw+zsnTEAWBuDDbUTmTQgk0lTMBlA0C7tLDpnsFcpwux6s/zGAmCOCAwgWg4leAfmUDRbD0fROUWt9XjNasFooKcCYEAQIJW3VRYEaBdB205Bc8AEWLtaFALd8d8yP2TXmwvAVCBakqs9MztxW3wpAGw9O8PPfYfPTZr3OZdgt5tOfFscLg2A+YTSgME1FwySJmGu5uLWkjzPHAsA758qbn/y4t+m+fQ5qwl0DvsT2rEmysltsBXY/+a5tRiwWUA6AJvdmpUC6wxYCejNuukM2OzWrBRYZ8BKQG/WTWfAZrdmpcA6A1YCerNuOgM2uzUrBfYH/6zsQTLY9P4AAAAASUVORK5CYII=')";
		popup.style.top = "5px";
		popup.style.display = "none";
		popup.innerHTML = "Show";
		textdiv.style.top = "25px";
		
		$(".text").css("height", "auto");
		if ($(".text").height() >= 704) {
			$(".text").css("overflow-y", "scroll");
			$(".text").css("height", "704px");
		} else {			
			$(".text").css("overflow", "visible");
		}
	} else if (video.className == "collapsed") {
		video.style.height = "330px";
		video.className = "expanded";
		video.setAttribute("controls","controls")
		button.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAErUlEQVR4Xu2agbEMQRCG+0WACBABIkAEiAARIAJEgAgQASJABIgAGRAB9b2aVq2vZ6Znd++KuTdVr07d7e50f/13T8+sEznycXLk/ssZgDMFtAlcEpFvM0NqpcA9EXkpIvdF5NWsEGoA1Hn1e1oIEQBk/zWI+JQQsgqYVgmZGuDFMJUSen2ArwXTKaEHAIenhpABMDWELIBpIYwAmBLCKIDpICwBsATCdRG5KiI0WXwy+Dxv1tgP5d98/hCRjyLyed8t+FIAPQhvReSWiNwuf0v9AARAeN67Ambps8L71gBoQdjUyPIwYADixZbKWAvg0BAULKp4WtSxCvYWAEYgfC9RxAHNda0H1IcbJWUuJr1CEY/WnFlsBaAH4aeIPBw4V6D7fCIiWRBciyKGxxIAROpxIU9e2lFrm4nS80HrWCE4iKGYZgYrxp1RNYwCwMFnZfliwptBZd567wCEuxkCxRZ2q6RGaowAIOpIzY5DQdBlVedGeaiqlibplMgC4GyQyPrB2sz3PhVaNWHJeQLpwOHsOWMAOU9a1dKE75mrOXoAmPhNqc7+QTav35f8y9YEDKfia1eIkvjudcNan1rMdaFcX0s7lAOEKECnt/YAfDJGqm1UdIzXNpVuD0ij6RD5WnuGXosK7MpA0dN8ByZLq1UJ9/HMazWwLQCR7L8Uydse3RaprSDUDEYlD4wzdIUsrzpqEKrpUANQc57IezlBnc2ODlYG3dhY8DWZRsGp1QlVm97Dhgmb7BiCEAGIDCXykfNM7NOEvKzlXBZCTbY4x3w6bB3IQNgB6wHQ5DCB3aaS83xfc+qXi0CvrmQh1J6Tnc/Dwkx8IL3+vO6LAEDfFpKdm5zDWYNG02ELAKxOPpiAqQLAyChCreoMIAvscrIdbSkhym1s82+tUKd1UCHzHUrmeju6KaAXR+1nDYIvgnZpigpcRgm+uus9mSKI80Reewy9lx5jp5lr5WsEgWhT5e0y2FualkKIVoLeXEPOY1ivYOHoFecBEOyGw0eF/CINRkZ2A8VLWytrC4mI05B52dfS6dS+HgCI0mnZdV4dowFBqlpdbR1Y0u/3IPjfbf4TBHoXXw9ae5UUgFZN4DfyH2cxjt2iDlTAclPtwSvyaJ0n0AHa6JLTBIF5bTfYzHk/b08B9nqff/obTvIbmyOrApRDQRwd2T4B8DjvJc987BT91j20YwQAD8A4nPUbjpqTqS1pcHMWgr919OitWwMixyg2OOaLYwsC6tgqHWrz0K5TC4b+U9eoAuzkSMzmfUvqOE+etvb70f1ZJaQlv6YGRAaSf6RE9uCS6FAbKJ5ETKNF9UZRfJc9VMEeljggDUXdOrJGAfY57BRRRLRcjhTB0fOEJcvtX/ZsBUAfSn1A6uRitlB6QAeFsDUAdQZJ64tR1DEK42AQ9gXARxVl6OtxPcHx6UI+M3CeP+pElNu9jnEk5RYtg0MT7OnizSAcSgH74LAJhP8ZgHambIL8SK8O/zuA1RBmALAKwiwAFkOYCcAiCLMBGIYwI4AWhJ3XdrMCiCAMH4vvo3k59DO1WQqdx5iZFaCw2XtEb6tPfz8GAE3VnQE4dFL+a/MdvQJ+A/51N1AIG+vYAAAAAElFTkSuQmCC')";
		popup.style.top = "335px";
		popup.style.display = "none";
		popup.innerHTML = "Hide";
		textdiv.style.top = "355px";
		
		$(".text").css("height", "auto");
		if ($(".text").height() >= 374) {
			$(".text").css("overflow-y", "scroll");
			$(".text").css("height", "374px");
		} else {			
			$(".text").css("overflow", "visible");
		}
	}
}