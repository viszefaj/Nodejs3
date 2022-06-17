start:
	@echo "Starting the project.."
	@docker-compose up -d

end:
	@echo "Closing the project..."
	@docker-compose down