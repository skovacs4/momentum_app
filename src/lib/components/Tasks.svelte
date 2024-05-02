<!-- TasksList.svelte -->
<script>
  // @ts-nocheck
  import { Icon } from "svelte-icons-pack";
  import { CiEdit } from "svelte-icons-pack/ci";
  import { IoCheckmarkCircleOutline } from "svelte-icons-pack/io";
  import { fetchTasksForUser } from "$lib/stores/database";
  import { auth } from "$lib/firebase";
  import EditTaskModal from "$lib/components/EditTaskModal.svelte";
  import CompleteButton from "$lib/components/CompleteButton.svelte";
  import {
    selectedTaskStore,
    selectedTaskStoreSecond,
    tasksStore,
  } from "$lib/stores/tasksStore"; // Import the selectedTaskStore
  import { onMount } from "svelte";

  /**
   * @type {any[]}
   */
  let tasks = [];

  onMount(async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Fetch tasks for the logged-in user
        tasks = await fetchTasksForUser();
        tasksStore.set(tasks); // Update tasksStore with fetched tasks
        console.log("Reactive tasks:", $tasksStore); // Log tasksStore for debugging
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  });

  // Listen for changes in selectedTaskStoreSecond
  // $: {
  //   const completedTask = $selectedTaskStoreSecond;
  //   if (completedTask) {
  //     // Remove the completed task from the tasks list
  //     tasks = tasks.filter((task) => task.id !== completedTask.id);
  //   }
  // }

  // Function to open the edit task modal
  function openEditModal(task) {
    selectedTaskStore.set(task);
  }

  // Function to open the complete task modal
  function openCompleteModal(task) {
    selectedTaskStoreSecond.set(task);
  }
</script>

<div class="tasks-container">
  <!-- Render the tasks data -->
  {#each $tasksStore.filter((task) => !task.completed) as task}
    <div class="task">
      <div class="task-details">
        <p class="title">{task.title}</p>
        <p class="description">{task.description}</p>
      </div>
      <div class="task-buttons">
        <button on:click={() => openEditModal(task)} class="edit"
          ><Icon src={CiEdit} className="edit-icon" /></button
        >
        <!-- svelte-ignore missing-declaration -->
        <button on:click={() => openCompleteModal(task)} class="complete"
          ><Icon
            src={IoCheckmarkCircleOutline}
            className="complete-icon"
          /></button
        >
      </div>
    </div>
  {/each}
  <EditTaskModal {selectedTaskStore} />
  <CompleteButton {selectedTaskStoreSecond} />
</div>

<style lang="scss">
  @media screen and (max-width: 768px) {
		.tasks-container {
			padding: 7.5px;
			margin-top: 15px;

			.task {
				display: flex;
				position: relative;
				justify-content: center;
				margin: 15px 0px;

				border-radius: 6px;
				background-color: var(--magic-purple);
				color: var(--text);

				.task-details {
					width: 75%;
					padding: 10px;

					p {
						margin: 3px;
					}

					.description {
						// width: 50%;
						word-wrap: break-word;
						opacity: 0.75;
					}

					.title {
						// width: 50%;
					}
				}

				.task-buttons {
					display: flex;
					justify-content: flex-end;
					width: 25%;

					font-size: 26px;

					svg {
						font-size: 26px !important;

						path,
						polyline {
							stroke: var(--text) !important;
						}
					}

					.edit {
						position: absolute;
						top: 0;
						opacity: 0;
						left: 0;
						right: 0;
						bottom: 0;
						width: 75%;
					}

					.complete {
						height: 100%;
						background-color: var(--primary-color);
						border: none;
						color: rgb(224, 224, 224);

						.complete-icon {
							// complet icon
							font-size: 26px !important;

							path {
								fill: white;
								stroke: var(--text) !important;
							}

							polyline {
								stroke: var(--text) !important;
							}
						}

						.complete-icon:hover {
							path {
								fill: green !important;
								stroke: var(--text) !important;
							}

							polyline {
								stroke: var(--text) !important;
							}
						}
					}
				}
			}
		}

		.add-task-btn {
			margin: 25px auto;
			display: flex;
			align-items: center;
			gap: 10px;
			padding: 15px;
			background-color: var(--primary-color);
			color: #fff;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			transition: background-color 0.3s ease;
			transform: rotateZ(45deg);

			.add-task-icon {
				transform: rotateZ(45deg);
				font-size: 23px;
			}
		}

		.add-task-btn:hover {
			background-color: var(--secondary-color);
			font-weight: 600;
		}
	}

@media screen and (min-width: 768px) {
		.complete-icon {
			// complete icon
			path {
				stroke: var(--text) !important;
			}

			polyline {
				stroke: var(--text) !important;
			}
		}

		.edit-icon {
			path {
				// fill: white;
				stroke: var(--accent-orange) !important;
			}

			polyline {
				stroke: var(--accent-orange) !important;
			}
		}

		.complete-icon:hover {
			path {
				fill: green !important;
				stroke: var(--text) !important;
			}

			polyline {
				stroke: var(--text) !important;
			}
		}

		.tasks-container {
			max-width: 1150px;
			padding: 20px;
			display: grid;
			gap: 20px;
			margin: auto;
		}

		/* Task Styles */
		.task {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px;
			background-color: var(--magic-purple);
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
			border-radius: 8px;
			color: var(--text);

			.task-details {
				flex-wrap: wrap;
				word-wrap: break-word;

				p {
					margin: 2px;
				}

				.description {
					opacity: 0.8;
				}
			}

			.task-buttons {
				display: flex;
				justify-content: end;

				svg {
					font-size: 26px;
          width: 25px;
          height: 25px;

					path,
					polyline {
						stroke: var(--text) !important;
					}
				}
			}

			.title {
				font-size: 17.5px;
			}
		}

		.task:hover {
			box-shadow: 1px 2px 1px rgba(var(--secondary-color), 0.9);
		}

		.task span {
			font-size: 16px;
			flex: 1;
			padding-left: 25px;
		}

		.task button {
			padding: 8px 16px;
			margin-left: 10px;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			transition: background-color 0.3s ease;
		}

		/* Use color variables for button colors */
		.task button {
			background-color: var(--primary-color);
			color: #fff;
			padding: 15px;
		}

		.task button:first-child:hover {
			background-color: var(--accent-orange);
		}

		.task button:last-child:hover {
			background-color: var(--secondary-color);
		}

		/* CompleteButton Styles (consider using the accent colors) */
		.complete-button {
			padding: 8px 16px;
			background-color: var(--accent-gold);
			color: #fff;
			border: none;
			border-radius: 4px;
			cursor: pointer;
			transition: background-color 0.3s ease;
		}

		.complete-button:hover {
			background-color: hsl(40, 100%, 45%);
			/* Adjust HSL values for desired darkening */
		}
	}
</style>