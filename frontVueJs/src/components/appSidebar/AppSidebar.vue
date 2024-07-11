<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
		<!-- <div class="logo">
			<img :src="logoURL" alt="logo" />
		</div> -->
		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<span class="material-icons">
					<img src="../../img/icons/right.svg" alt="right">
                </span>
			</button>
		</div>
		<h3>Menu</h3>
		<div class="menu">
			<router-link to="/" class="button">
				<span class="material-icons">
					<img src="../../img/icons/home.svg" alt="home">				
				</span>
				<span class="text">Home</span>
			</router-link>

			<router-link to="/get" class="button">
				<span class="material-icons">
					<img src="../../img/icons/get.svg" alt="get">
				</span>
				<span class="text">Get Methods</span>
			</router-link>

			<router-link to="/post" class="button">
				<span class="material-icons">
					<img src="../../img/icons/post.svg" alt="post">				
				</span>
				<span class="text">Post Methods</span>
			</router-link>

			<router-link to="/delete" class="button">
				<span class="material-icons">
					<img src="../../img/icons/delete.svg" alt="delete">					
				</span>
				<span class="text">Delete Methods</span>
			</router-link>
			<router-link to="/update" class="button">
				<span class="material-icons">
					<i class="fa-solid fa-wrench"></i>				
				</span>
				<span class="text">Update Methods</span>
			</router-link>
		</div>

		<div class="flex"></div>
	</aside>
</template>

<script setup>
import { ref } from 'vue';

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value;
    localStorage.setItem("is_expanded", is_expanded.value);
};


</script>


<style lang="scss" scoped>
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}
aside {
	display: flex;
	flex-direction: column;

	background-color:#334155;
	color:#f1f5f9;

	width: calc(2rem + 32px);
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;

	transition: 0.2s ease-in-out;

	.flex {
		flex: 1 1 0%;
	}

	.logo {
		margin-bottom: 1rem;

		img {
			width: 2rem;
		}
	}

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-bottom: 2rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;
		border: none;
		outline: none;
		.menu-toggle {
			transition: 0.2s ease-in-out;
			background-color:#334155;
			border: none;
			outline: none;
			margin-top: 40px;
			.material-icons .imgIcon {
				font-size: 2rem;
				 color: #f1f5f9;
				 background-color:#334155;
				transition: 0.2s ease-out;
				border: none;
				outline: none;
			}

			&:hover {
				.material-icons .imgIcon {
					color: #4ade80;
					transform: translateX(0.5rem);
				}
			}
		}
	}

	h3,
	.button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	h3 {
		color: #64748b;;
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.menu {
		margin: 0 -1rem;

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;

			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;

			.material-icons {
				font-size: 2rem;
				color: #f1f5f9;
				transition: 0.2s ease-in-out;
			}

			.text {
				color: #f1f5f9;
				transition: 0.2s ease-in-out;
			}

			&:hover {
				background-color: #334155;

				.material-icons,
				.text {
					color: #4ade80;
				}
			}

			&.router-link-exact-active {
				background-color:#334155;
				border-right: 5px solid #4ade80;

				.material-icons,
				.text {
					color: #4ade80;
				}
			}
		}
	}

	.footer {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		p {
			font-size: 0.875rem;
			color: #64748b;
		}
	}

	&.is-expanded {
		width: 300px;

		.menu-toggle-wrap {
			top: -3rem;

			.menu-toggle {
				transform: rotate(-180deg);
			}
		}

		h3,
		.button .text {
			opacity: 1;
			color: #f1f5f9;
		}

		.button {
			.material-icons {
				margin-right: 1rem;
			}
		}

		.footer {
			opacity: 0;
		}
	}

	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}
</style>