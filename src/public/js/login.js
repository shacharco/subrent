var tabsVue = new Vue({
	el: '#tabs',
	data: {
		user: undefined
	},
	mounted: async function () {
		this.$nextTick(async function () {
		  this.user = await getUser();
		  console.log(this.user)
		})
	  }
});

async function getUser() {
	const fetchOptions = {

		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: ""
	};
	const response = await fetch("/user_info", fetchOptions);
	if (!response.ok) {
		return undefined;
	}
	return response.json();
}

